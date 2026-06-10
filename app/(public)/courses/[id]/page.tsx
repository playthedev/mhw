import { notFound } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"
import { courses, getCourseById, getRelatedCourses } from "@/lib/courses"
import CourseDetailClient from "./CourseDetailClient"

export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = getCourseById(id)
  if (!course) return {}
  return {
    title: `${course.title} | MHW Consultancy`,
    description: course.description,
  }
}

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = getCourseById(id)
  if (!course) notFound()

  const related = getRelatedCourses(course)

  let isEnrolled = false
  const session = await getSession()
  if (session) {
    const db = await getDb()
    const enrollment = await db.collection("enrollments").findOne({
      courseId: course.id,
      customerEmail: session.email,
      paymentStatus: "paid",
    })
    isEnrolled = !!enrollment
  }

  return <CourseDetailClient course={course} related={related} isEnrolled={isEnrolled} />
}
