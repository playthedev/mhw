import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getDb } from "@/lib/mongodb"
import { signToken, createSessionCookie } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const db = await getDb()
    const user = await db.collection("users").findOne({ email: email.toLowerCase().trim() })

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash)
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    if (!user.emailVerified) {
      return NextResponse.json({ error: "Please verify your email before signing in. Check your inbox.", code: "EMAIL_NOT_VERIFIED" }, { status: 403 })
    }

    const token = await signToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    })

    const cookie = createSessionCookie(token)
    const res = NextResponse.json({
      success: true,
      user: { name: user.name, email: user.email, role: user.role },
    })
    res.cookies.set(cookie)
    return res
  } catch (err) {
    console.error("Login error:", err)
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 })
  }
}
