import { NextRequest, NextResponse } from "next/server"
import { getRazorpay } from "@/lib/razorpay"
import { getSessionFromRequest } from "@/lib/auth"
import { getCourseById } from "@/lib/courses"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { courseId } = await req.json()

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 })
    }

    // Price comes from the server, not the client
    const course = getCourseById(courseId)
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    const razorpay = getRazorpay()

    const order = await razorpay.orders.create({
      amount: course.price * 100, // paise
      currency: "INR",
      receipt: `mhw_${Date.now()}`,
      notes: {
        courseId,
        courseName: course.title,
      },
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (err) {
    console.error("Razorpay order error:", err)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
