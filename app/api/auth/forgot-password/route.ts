import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { getDb } from "@/lib/mongodb"
import { sendForgotPasswordEmail } from "@/lib/email"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const db = await getDb()
    const user = await db.collection("users").findOne({ email: email.toLowerCase().trim() })

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({ success: true, message: "If an account exists, a reset link has been sent." })
    }

    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await db.collection("users").updateOne(
      { _id: user._id },
      { $set: { resetPasswordToken: token, resetPasswordExpires: expires, updatedAt: new Date() } }
    )

    await sendForgotPasswordEmail(user.email, user.name, token)

    return NextResponse.json({ success: true, message: "If an account exists, a reset link has been sent." })
  } catch (err) {
    console.error("Forgot password error:", err)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
