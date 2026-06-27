import { NextRequest, NextResponse } from "next/server"
import { verifyPaymentSignature } from "@/lib/razorpay"
import { getSessionFromRequest } from "@/lib/auth"
import { getCourseById } from "@/lib/courses"
import { getDb } from "@/lib/mongodb"
import { sendEnrollmentConfirmation } from "@/lib/email"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = await req.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courseId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // All identity and pricing from authoritative server sources
    const customerEmail = session.email
    const customerName = session.name
    const course = getCourseById(courseId)
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    const isValid = verifyPaymentSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    })

    const db = await getDb()
    const now = new Date()

    // Always write a raw transaction record for audit purposes
    await db.collection("transactions").insertOne({
      gateway: "razorpay",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      signatureValid: isValid,
      courseId,
      courseName: course.title,
      amount: course.price,
      customerName,
      customerEmail,
      createdAt: now,
    })

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 })
    }

    // Idempotency: avoid duplicate enrollment records for the same payment
    const existing = await db.collection("enrollments").findOne({ razorpayPaymentId: razorpay_payment_id })
    if (!existing) {
      await db.collection("enrollments").insertOne({
        courseId,
        courseName: course.title,
        amount: course.price,
        status: "active",
        paymentStatus: "paid",
        paymentGateway: "razorpay",
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        customerEmail,
        customerName,
        createdAt: now,
        updatedAt: now,
      })

      try {
        await sendEnrollmentConfirmation({
          to: customerEmail,
          name: customerName,
          courseName: course.title,
          amount: course.price,
          paymentId: razorpay_payment_id,
        })
      } catch (err) {
        console.error("Enrollment email error:", err)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Razorpay verify error:", err)
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}
