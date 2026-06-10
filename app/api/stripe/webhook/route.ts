import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { getDb } from "@/lib/mongodb"
import { sendEnrollmentConfirmation } from "@/lib/email"
import Stripe from "stripe"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const { courseId, courseName } = session.metadata!
    const amount = (session.amount_total || 0) / 100
    const customerEmail = session.customer_details?.email || ""
    const customerName = session.customer_details?.name || ""

    const db = await getDb()
    await db.collection("enrollments").insertOne({
      courseId,
      courseName,
      amount,
      status: "active",
      paymentStatus: "paid",
      stripeSessionId: session.id,
      customerEmail,
      customerName,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Send confirmation emails
    if (customerEmail) {
      sendEnrollmentConfirmation({
        to: customerEmail,
        name: customerName || "Student",
        courseName,
        amount,
        paymentId: session.id,
      }).catch((err) => console.error("Enrollment email error:", err))
    }
  }

  return NextResponse.json({ received: true })
}
