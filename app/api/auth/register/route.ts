import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { getDb } from "@/lib/mongodb"
import { sendVerificationEmail } from "@/lib/email"
import type { User } from "@/lib/models"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const db = await getDb()
    const existing = await db.collection("users").findOne({ email: email.toLowerCase() })
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const emailVerifyToken = crypto.randomBytes(32).toString("hex")
    const emailVerifyExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h

    const user: User = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      role: "user",
      emailVerified: false,
      emailVerifyToken,
      emailVerifyExpires,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await db.collection("users").insertOne(user)
    await sendVerificationEmail(user.email, user.name, emailVerifyToken)

    return NextResponse.json({ success: true, message: "Account created. Please check your email to verify your account." })
  } catch (err) {
    console.error("Register error:", err)
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 })
  }
}
