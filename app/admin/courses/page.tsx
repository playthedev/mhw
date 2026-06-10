import { BookOpen, Clock, IndianRupee } from "lucide-react"

export const dynamic = "force-dynamic"

const courses = [
  {
    id: "1",
    title: "NGO Management & Compliance",
    category: "Management",
    duration: "3 months",
    price: 15000,
    students: 48,
    status: "active",
  },
  {
    id: "2",
    title: "Accounting Basics for Non-Profits",
    category: "Finance",
    duration: "2 months",
    price: 12000,
    students: 35,
    status: "active",
  },
  {
    id: "3",
    title: "Tax Compliance & Filing",
    category: "Finance",
    duration: "6 weeks",
    price: 20000,
    students: 22,
    status: "active",
  },
  {
    id: "4",
    title: "Internship Program",
    category: "Career",
    duration: "6 months",
    price: 25000,
    students: 15,
    status: "active",
  },
]

const statusColors: Record<string, string> = {
  active: "bg-green-500/10 text-green-400 border-green-500/20",
  draft: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  archived: "bg-[var(--text-muted)]/10 text-[var(--text-muted)] border-[var(--text-muted)]/20",
}

export default function CoursesAdminPage() {
  const totalStudents = courses.reduce((s, c) => s + c.students, 0)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-(--text) mb-1" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          Courses
        </h1>
        <p className="text-[var(--text-muted)] text-sm">
          {courses.length} courses · {totalStudents} enrolled students
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 border border-(--border-soft) text-center">
          <BookOpen className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-(--text) font-medium mb-1">No courses yet</p>
          <p className="text-[var(--text-muted)] text-sm">Courses will appear here once added.</p>
        </div>
      ) : (
        <div className="grid gap-5">
          {courses.map((course) => {
            const price = new Intl.NumberFormat("en-IN", {
              style: "currency", currency: "INR", maximumFractionDigits: 0,
            }).format(course.price)

            return (
              <div key={course.id} className="glass-card rounded-2xl p-6 border border-(--border-soft) hover:border-(--border) transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-primary-400" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-(--text) font-semibold mb-1 truncate">{course.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
                        <span className="px-2 py-0.5 rounded-md bg-(--surface) border border-(--border-soft)">{course.category}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                        <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" />{price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-(--text) font-semibold text-sm">{course.students}</div>
                      <div className="text-[var(--text-muted)] text-xs">students</div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[course.status]}`}>
                      {course.status}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
