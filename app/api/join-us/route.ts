import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { sendJoinUsEmails } from "@/lib/email"
import type { JoinUsCategory, JoinUsSubmission } from "@/lib/models"

export const dynamic = "force-dynamic"

const VALID_CATEGORIES: JoinUsCategory[] = ["professional", "internship", "career"]

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      category,
      name,
      mobile,
      email,
      professionSector,
      yearsOfExperience,
      qualification,
      position,
      why,
      resumeUrl,
    } = body

    if (!category || !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 })
    }
    if (!name || !mobile || !email || !why) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const submission: JoinUsSubmission = {
      category,
      name,
      mobile,
      email,
      professionSector: professionSector || undefined,
      yearsOfExperience: yearsOfExperience || undefined,
      qualification: qualification || undefined,
      position: position || undefined,
      why,
      resumeUrl: resumeUrl || undefined,
      status: "new",
      createdAt: new Date(),
    }

    const db = await getDb()
    await db.collection("joinus_submissions").insertOne(submission)

    // Send emails (fire and forget — don't fail the request if email fails)
    sendJoinUsEmails(submission).catch((err) => console.error("Join Us email error:", err))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Join Us API error:", err)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
