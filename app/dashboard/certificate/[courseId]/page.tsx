import { redirect, notFound } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"
import { getCourseById } from "@/lib/courses"
import CertificateClient from "./CertificateClient"

export const dynamic = "force-dynamic"

export default async function CertificatePage({ params }: { params: Promise<{ courseId: string }> }) {
  const session = await getSession()
  if (!session) redirect("/login")

  const { courseId } = await params
  const course = getCourseById(courseId)
  if (!course) notFound()

  const db = await getDb()
  const enrollment = await db.collection("enrollments").findOne({
    courseId,
    customerEmail: session.email,
    paymentStatus: "paid",
  })

  if (!enrollment) redirect(`/courses/${courseId}`)

  // Certificate is available when status is completed OR when all lessons are marked done
  const progress = await db.collection("course_progress").findOne({
    courseId,
    userEmail: session.email,
  })

  const totalLessons = course.syllabus.reduce((s, m) => s + m.lessons.length, 0)
  const completedLessons = (progress?.completedLessons as string[] | undefined)?.length ?? 0
  const isCompleted = enrollment.status === "completed" || completedLessons === totalLessons

  if (!isCompleted) redirect(`/dashboard/courses/${courseId}`)

  const completedAt = (enrollment.completedAt ?? enrollment.updatedAt ?? enrollment.createdAt) as Date

  return (
    <CertificateClient
      courseName={course.title}
      studentName={session.name}
      instructorName={course.instructor}
      instructorRole={course.instructorRole}
      completedAt={new Date(completedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
      courseId={courseId}
      duration={course.duration}
    />
  )
}
