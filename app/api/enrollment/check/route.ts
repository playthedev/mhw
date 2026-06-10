import { NextRequest, NextResponse } from "next/server"
import { getSessionFromRequest } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ enrolled: false })

  const courseId = req.nextUrl.searchParams.get("courseId")
  if (!courseId) return NextResponse.json({ enrolled: false })

  const db = await getDb()
  const enrollment = await db.collection("enrollments").findOne({
    courseId,
    customerEmail: session.email,
    paymentStatus: "paid",
  })

  return NextResponse.json({ enrolled: !!enrollment })
}
