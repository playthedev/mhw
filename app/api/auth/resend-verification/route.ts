import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { getDb } from "@/lib/mongodb"
import { sendVerificationEmail } from "@/lib/email"

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
    if (!user || user.emailVerified) {
      return NextResponse.json({ success: true })
    }

    const emailVerifyToken = crypto.randomBytes(32).toString("hex")
    const emailVerifyExpires = new Date(Date.now() + 24 * 60 * 60 * 1000)

    await db.collection("users").updateOne(
      { _id: user._id },
      { $set: { emailVerifyToken, emailVerifyExpires, updatedAt: new Date() } }
    )

    await sendVerificationEmail(user.email, user.name, emailVerifyToken)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Resend verification error:", err)
    return NextResponse.json({ error: "Failed to resend. Please try again." }, { status: 500 })
  }
}
