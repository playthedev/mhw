import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { sendContactEmails } from "@/lib/email"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, service, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await getDb()
    await db.collection("contact_submissions").insertOne({
      name,
      email,
      phone: phone || null,
      subject: service || "General Inquiry",
      message,
      status: "new",
      createdAt: new Date(),
    })

    // Send emails (fire and forget — don't fail the request if email fails)
    sendContactEmails({
      name,
      email,
      phone: phone || undefined,
      subject: service || "General Inquiry",
      message,
    }).catch((err) => console.error("Contact email error:", err))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
  }
}
