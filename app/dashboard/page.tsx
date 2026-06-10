import { getSession } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"
import { redirect } from "next/navigation"
import Link from "next/link"
import { BookOpen, Clock, CheckCircle2, ArrowRight, GraduationCap, Play, Trophy } from "lucide-react"
import { getCourseById } from "@/lib/courses"
import DashboardActions from "./DashboardActions"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect("/login?redirect=/dashboard")

  const db = await getDb()

  const enrollments = await db
    .collection("enrollments")
    .find({ customerEmail: session.email, paymentStatus: "paid" })
    .sort({ createdAt: -1 })
    .toArray()

  // Fetch progress for all enrolled courses in one shot
  const progressDocs = await db
    .collection("course_progress")
    .find({ userEmail: session.email })
    .toArray()

  const progressMap: Record<string, string[]> = {}
  for (const p of progressDocs) {
    progressMap[p.courseId as string] = (p.completedLessons as string[]) ?? []
  }

  const totalSpent = enrollments.reduce((sum, e) => sum + (e.amount || 0), 0)
  const completedCount = enrollments.filter((e) => e.status === "completed").length

  const formattedTotal = new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(totalSpent)

  return (
    <div>
      {/* Welcome */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-(--text) mb-2" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          Welcome back, <span className="gradient-text">{session.name.split(" ")[0]}</span>!
        </h1>
        <p className="text-[var(--text-muted)]">Continue your learning journey.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-10">
        {[
          { icon: <BookOpen className="w-5 h-5 text-primary-400" />, bg: "bg-primary-500/10 border-primary-500/20", value: enrollments.length, label: "Enrolled" },
          { icon: <CheckCircle2 className="w-5 h-5 text-green-400" />, bg: "bg-green-500/10 border-green-500/20", value: completedCount, label: "Completed" },
          { icon: <Trophy className="w-5 h-5 text-gold-400" />, bg: "bg-gold-500/10 border-gold-500/20", value: completedCount, label: "Certificates" },
          { icon: <GraduationCap className="w-5 h-5 text-purple-400" />, bg: "bg-purple-500/10 border-purple-500/20", value: formattedTotal, label: "Invested" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-4 sm:p-6 border border-(--border-soft) min-w-0">
            <div className={`w-10 h-10 rounded-xl ${s.bg} border flex items-center justify-center mb-4`}>{s.icon}</div>
            <div className="text-xl sm:text-2xl font-bold text-(--text) mb-1 truncate" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{s.value}</div>
            <div className="text-sm text-[var(--text-muted)]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* My Courses */}
      <div className="glass-card rounded-2xl border border-(--border-soft) overflow-hidden">
        <div className="flex items-center justify-between px-4 sm:px-6 py-5 border-b border-(--border-soft)">
          <h2 className="text-(--text) font-semibold" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>My Courses</h2>
          <Link href="/courses" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors">
            Browse more <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {enrollments.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-5">
              <BookOpen className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="text-(--text) font-semibold mb-2">No courses yet</h3>
            <p className="text-[var(--text-muted)] text-sm mb-6">Start your learning journey today.</p>
            <Link href="/courses" className="inline-flex items-center gap-2 shimmer-btn text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:scale-105 transition-all duration-200">
              <BookOpen className="w-4 h-4" /> Explore Courses
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-(--border-soft)">
            {enrollments.map((enrollment) => {
              const course = getCourseById(enrollment.courseId)
              const completed = progressMap[enrollment.courseId] ?? []
              const totalLessons = course?.syllabus.reduce((s, m) => s + m.lessons.length, 0) ?? 1
              const percent = Math.min(100, Math.round((completed.length / totalLessons) * 100))
              const isCompleted = enrollment.status === "completed" || completed.length === totalLessons

              const date = new Date(enrollment.createdAt).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric",
              })
              const amount = new Intl.NumberFormat("en-IN", {
                style: "currency", currency: "INR", maximumFractionDigits: 0,
              }).format(enrollment.amount)

              return (
                <div key={enrollment._id?.toString()} className="px-4 sm:px-6 py-4 sm:py-5 hover:bg-(--surface-faint) transition-colors">
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${course?.gradient ?? "from-primary-500/20 to-purple-500/10"} flex items-center justify-center flex-shrink-0 border border-(--border)`}>
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-(--text)/80 ml-0.5" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-2">
                        <div className="min-w-0">
                          <p className="text-(--text) font-medium text-sm">{enrollment.courseName}</p>
                          <div className="flex items-center gap-3 mt-1 flex-wrap">
                            <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Enrolled {date}
                            </span>
                            <span className="text-xs text-(--text) font-medium">{amount}</span>
                            {isCompleted && (
                              <span className="text-xs text-gold-400 flex items-center gap-1">
                                <Trophy className="w-3 h-3" /> Completed
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <DashboardActions
                          courseId={enrollment.courseId}
                          razorpayPaymentId={enrollment.razorpayPaymentId}
                          isCompleted={isCompleted}
                          percent={percent}
                        />
                      </div>

                      {/* Progress bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-(--surface) rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${isCompleted ? "bg-gradient-to-r from-gold-400 to-gold-500" : "bg-gradient-to-r from-primary-500 to-purple-500"}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-xs text-[var(--text-muted)] flex-shrink-0">{percent}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
