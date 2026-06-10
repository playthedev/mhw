import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getDb } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json({ error: "Token and password are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    const db = await getDb()
    const user = await db.collection("users").findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    })

    if (!user) {
      return NextResponse.json({ error: "This reset link is invalid or has expired. Please request a new one." }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: { passwordHash, updatedAt: new Date() },
        $unset: { resetPasswordToken: "", resetPasswordExpires: "" },
      }
    )

    return NextResponse.json({ success: true, message: "Password updated successfully. You can now sign in." })
  } catch (err) {
    console.error("Reset password error:", err)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
