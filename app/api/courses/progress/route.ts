import { NextRequest, NextResponse } from "next/server"
import { getSessionFromRequest } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"
import { getCourseById } from "@/lib/courses"

export const dynamic = "force-dynamic"

// Mark a lesson complete
export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { courseId, lessonKey } = await req.json()
  if (!courseId || !lessonKey) return NextResponse.json({ error: "Missing fields" }, { status: 400 })

  const db = await getDb()

  // Verify enrollment
  const enrollment = await db.collection("enrollments").findOne({
    courseId,
    customerEmail: session.email,
    paymentStatus: "paid",
  })
  if (!enrollment) return NextResponse.json({ error: "Not enrolled" }, { status: 403 })

  // Upsert progress document
  await db.collection("course_progress").updateOne(
    { courseId, userEmail: session.email },
    {
      $addToSet: { completedLessons: lessonKey },
      $set: { updatedAt: new Date() },
      $setOnInsert: { courseId, userEmail: session.email, createdAt: new Date() },
    },
    { upsert: true }
  )

  // Check if ALL lessons are now complete → mark enrollment as completed
  const course = getCourseById(courseId)
  if (course) {
    const allLessonKeys = course.syllabus.flatMap((mod, mi) =>
      mod.lessons.map((_, li) => `${mi}-${li}`)
    )
    const progress = await db.collection("course_progress").findOne({
      courseId,
      userEmail: session.email,
    })
    const completed = (progress?.completedLessons as string[]) ?? []
    const allDone = allLessonKeys.every((k) => completed.includes(k))
    if (allDone) {
      await db.collection("enrollments").updateOne(
        { courseId, customerEmail: session.email },
        { $set: { status: "completed", completedAt: new Date(), updatedAt: new Date() } }
      )
    }
  }

  return NextResponse.json({ success: true })
}
