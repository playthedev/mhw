import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getSession, signToken, createSessionCookie } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { name, countryCode, phone, currentPassword, newPassword } = body as Record<string, string | undefined>

    // ── Name validation ──────────────────────────────────────────────────────
    const trimmedName = (name ?? "").trim()
    if (!trimmedName) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }
    if (trimmedName.length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 })
    }
    if (trimmedName.length > 50) {
      return NextResponse.json({ error: "Name must be 50 characters or fewer" }, { status: 400 })
    }
    if (!/^[a-zA-Z\s\-'.]+$/.test(trimmedName)) {
      return NextResponse.json({ error: "Name contains invalid characters" }, { status: 400 })
    }

    // ── Phone validation ─────────────────────────────────────────────────────
    const trimmedPhone = phone ? phone.replace(/\s/g, "").trim() : ""
    if (trimmedPhone) {
      const digits = trimmedPhone.replace(/\D/g, "")
      if (digits.length < 7) {
        return NextResponse.json({ error: "Phone number is too short (min 7 digits)" }, { status: 400 })
      }
      if (digits.length > 15) {
        return NextResponse.json({ error: "Phone number is too long (max 15 digits)" }, { status: 400 })
      }
      if (!/^\+?\d[\d\s\-()+]*$/.test(trimmedPhone)) {
        return NextResponse.json({ error: "Phone number contains invalid characters" }, { status: 400 })
      }
    }

    const validCountryCodes = ["+91","+1","+44","+61","+971","+65","+60","+966","+49","+33"]
    const resolvedCountryCode = countryCode && validCountryCodes.includes(countryCode) ? countryCode : "+91"

    // ── Password validation ──────────────────────────────────────────────────
    if (newPassword !== undefined && newPassword !== "") {
      if (!currentPassword) {
        return NextResponse.json({ error: "Current password is required to set a new password" }, { status: 400 })
      }
      if (newPassword.length < 8) {
        return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 })
      }
      if (newPassword.length > 128) {
        return NextResponse.json({ error: "Password is too long" }, { status: 400 })
      }
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
        return NextResponse.json({ error: "Password must include uppercase, lowercase, and a number" }, { status: 400 })
      }
    }

    const db = await getDb()
    const user = await db.collection("users").findOne({ email: session.email })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const updates: Record<string, unknown> = {
      name: trimmedName,
      updatedAt: new Date(),
    }

    if (trimmedPhone) {
      updates.phone = trimmedPhone
      updates.countryCode = resolvedCountryCode
    } else {
      updates.phone = null
      updates.countryCode = null
    }

    if (newPassword) {
      const valid = await bcrypt.compare(currentPassword!, user.passwordHash)
      if (!valid) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
      }
      updates.passwordHash = await bcrypt.hash(newPassword, 12)
    }

    await db.collection("users").updateOne({ email: session.email }, { $set: updates })

    const newToken = await signToken({
      userId: session.userId,
      email: session.email,
      name: trimmedName,
      role: session.role,
    })

    const response = NextResponse.json({
      success: true,
      user: {
        name: trimmedName,
        email: session.email,
        role: session.role,
        phone: trimmedPhone || null,
        countryCode: trimmedPhone ? resolvedCountryCode : null,
      },
    })

    response.cookies.set(createSessionCookie(newToken))
    return response
  } catch (err) {
    console.error("Update profile error:", err)
    return NextResponse.json({ error: "Failed to update profile. Please try again." }, { status: 500 })
  }
}
