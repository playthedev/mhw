import { redirect, notFound } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"
import { getCourseById } from "@/lib/courses"
import LessonPlayer from "./LessonPlayer"

export const dynamic = "force-dynamic"

export default async function CoursePlayerPage({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>
  searchParams: Promise<{ lesson?: string; module?: string }>
}) {
  const session = await getSession()
  if (!session) redirect("/login?redirect=/dashboard")

  const { courseId } = await params
  const { lesson: lessonParam, module: moduleParam } = await searchParams

  const course = getCourseById(courseId)
  if (!course) notFound()

  // Access control — must have a paid enrollment
  const db = await getDb()
  const enrollment = await db.collection("enrollments").findOne({
    courseId,
    customerEmail: session.email,
    paymentStatus: "paid",
  })

  if (!enrollment) redirect(`/courses/${courseId}`)

  const moduleIndex = Math.max(0, parseInt(moduleParam ?? "0", 10))
  const lessonIndex = Math.max(0, parseInt(lessonParam ?? "0", 10))

  // Calculate total lessons completed from progress collection
  const progress = await db.collection("course_progress").findOne({
    courseId,
    userEmail: session.email,
  })

  return (
    <LessonPlayer
      course={course}
      enrollment={{ id: enrollment._id.toString(), enrolledAt: enrollment.createdAt }}
      initialModule={moduleIndex}
      initialLesson={lessonIndex}
      completedLessons={(progress?.completedLessons as string[]) ?? []}
      userEmail={session.email}
      userName={session.name}
    />
  )
}
