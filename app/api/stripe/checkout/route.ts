import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const { courseId, courseName, price } = await req.json()

    if (!courseId || !courseName || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: courseName,
              description: `Enroll in ${courseName} — MHW Consultancy`,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/courses?success=true&courseId=${courseId}`,
      cancel_url: `${baseUrl}/courses?cancelled=true`,
      metadata: {
        courseId,
        courseName,
      },
    })

    return NextResponse.json({ sessionId: session.id, checkoutUrl: session.url })
  } catch (err) {
    console.error("Stripe checkout error:", err)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
