"use client"

import { motion } from "framer-motion"
import { Suspense, useState, useEffect } from "react"
import { Clock, Users, Star, Play, CheckCircle2, ArrowRight, Filter, Trophy, BookOpen, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { formatPrice } from "@/lib/utils"
import EnrollButton from "@/components/ui/EnrollButton"
import { courses } from "@/lib/courses"
import { toast } from "sonner"

const categories = ["All", "NGO", "Accounting", "Tax", "Compliance", "Internship"]

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <CoursesPageContent />
    </Suspense>
  )
}

function CoursesPageContent() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("enrolled")) {
      toast.success("You're enrolled! Check your email for confirmation.")
    }
  }, [searchParams])

  const filtered = activeCategory === "All" ? courses : courses.filter((c) => c.category === activeCategory)
  const featured = courses.filter((c) => c.featured)

  const totalStudents = courses.reduce((s, c) => s + c.students, 0)

  const categoryCounts = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = cat === "All" ? courses.length : courses.filter((c) => c.category === cat).length
    return acc
  }, {})

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 hero-bg dot-grid overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gold-500/6 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary-500/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-gold-500/20 mb-6">
              <span className="text-xs font-medium text-gold-400 uppercase tracking-wider">Courses & Training</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-(--text) mb-6"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              Courses Designed for
              <br />
              <span className="gradient-text">Real-World Impact</span>
            </h1>
            <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-2xl mx-auto mb-10">
              Professional courses taught by certified experts. Enroll online, learn at your pace, and get certified.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <BookOpen className="w-4 h-4 text-gold-400" />
                <span><span className="text-(--text) font-semibold">{courses.length}</span> courses</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-(--surface-hover)" />
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Users className="w-4 h-4 text-primary-400" />
                <span><span className="text-(--text) font-semibold">{totalStudents.toLocaleString("en-IN")}+</span> students</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-(--surface-hover)" />
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Trophy className="w-4 h-4 text-green-400" />
                <span><span className="text-(--text) font-semibold">Certificate</span> on completion</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-(--surface-hover)" />
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span><span className="text-(--text) font-semibold">{categories.length - 1}</span> specialisations</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </section>

      {/* ── Sticky filter ── */}
      <section className="py-5 border-b border-(--border-soft) sticky top-16 z-30 bg-[var(--bg)]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Filter className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                    : "glass text-[var(--text-muted)] hover:text-(--text) border border-(--border-soft) hover:border-(--border)"
                }`}
              >
                {cat}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat ? "bg-(--surface-strong) text-(--text)" : "bg-(--surface) text-[var(--text-muted)]"
                }`}>
                  {categoryCounts[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured (All + no filter) ── */}
      {activeCategory === "All" && (
        <section className="pt-16 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-5 rounded-full bg-gradient-to-b from-gold-400 to-primary-500" />
              <h2
                className="text-(--text) font-semibold text-lg"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                Featured Courses
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`glass-card rounded-2xl border border-(--border-soft) hover:border-gold-500/20 transition-all duration-300 overflow-hidden relative bg-gradient-to-br ${course.gradient}`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-medium text-primary-400 bg-primary-500/10 px-2.5 py-1 rounded-full">
                          {course.category}
                        </span>
                        <span className="text-xs font-medium text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/20">
                          Featured
                        </span>
                        {course.badge && (
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${course.badgeColor}`}>
                            {course.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xl font-bold text-(--text) flex-shrink-0">{formatPrice(course.price)}</span>
                    </div>

                    <Link href={`/courses/${course.id}`}>
                      <h3
                        className="text-(--text) font-bold text-xl leading-snug mb-2 hover:text-primary-300 transition-colors"
                        style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                      >
                        {course.title}
                      </h3>
                    </Link>
                    <p className="text-[var(--text-muted)] text-sm mb-5">{course.description}</p>

                    <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-5">
                      <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</div>
                      <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{course.students} students</div>
                      <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" /><span className="text-(--text)">{course.rating}</span> ({course.reviews})</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <EnrollButton courseId={course.id} courseName={course.title} price={course.price} />
                      <Link
                        href={`/courses/${course.id}`}
                        className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-(--text) transition-colors"
                      >
                        View details <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All / Filtered courses ── */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary-500 to-purple-500" />
              <h2
                className="text-(--text) font-semibold text-lg"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                {activeCategory === "All" ? "All Courses" : activeCategory}
              </h2>
            </div>
            <span className="text-sm text-[var(--text-muted)]">{filtered.length} course{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card rounded-2xl overflow-hidden border border-(--border-soft) hover:border-primary-500/20 transition-all duration-300 flex flex-col group"
              >
                {/* Thumbnail */}
                <Link href={`/courses/${course.id}`} className="block">
                  <div className={`relative h-48 bg-gradient-to-br ${course.gradient} flex items-center justify-center`}>
                    <div className="w-16 h-16 rounded-2xl bg-(--surface-hover) flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-(--text) ml-1" />
                    </div>
                    {course.badge && (
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border ${course.badgeColor}`}>
                        {course.badge}
                      </div>
                    )}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/30 text-xs font-medium text-(--text)/80 backdrop-blur-sm">
                      {course.level}
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-primary-400 bg-primary-500/10 px-2.5 py-1 rounded-full">
                      {course.category}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">{course.lessons} lessons</span>
                  </div>

                  <Link href={`/courses/${course.id}`}>
                    <h3
                      className="text-(--text) font-semibold text-base leading-tight mb-3 line-clamp-2 group-hover:text-primary-300 transition-colors"
                      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                    >
                      {course.title}
                    </h3>
                  </Link>

                  <p className="text-[var(--text-muted)] text-xs leading-relaxed mb-4 line-clamp-2">{course.description}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-4">
                    <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</div>
                    <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{course.students}</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                      <span className="text-(--text)">{course.rating}</span>
                    </div>
                  </div>

                  {/* Syllabus toggle */}
                  <button
                    onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                    className="text-xs text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1 mb-4 w-fit"
                  >
                    {expandedCourse === course.id ? "Hide" : "View"} syllabus
                    <ArrowRight className={`w-3 h-3 transition-transform ${expandedCourse === course.id ? "rotate-90" : ""}`} />
                  </button>

                  {expandedCourse === course.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mb-4 space-y-1.5"
                    >
                      {course.syllabus.map((mod) => (
                        <div key={mod.title} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary-400 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-[var(--text-muted)]">{mod.title}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Footer */}
                  <div className="mt-auto pt-4 border-t border-(--border-soft) flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xl font-bold text-(--text)">{formatPrice(course.price)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/courses/${course.id}`}
                        className="text-xs text-[var(--text-muted)] hover:text-(--text) transition-colors hidden sm:block"
                      >
                        Details
                      </Link>
                      <EnrollButton courseId={course.id} courseName={course.title} price={course.price} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className="py-12 border-t border-(--border-soft)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Trophy className="w-5 h-5 text-gold-400" />, label: "Certified instructors", sub: "Industry experts" },
              { icon: <Clock className="w-5 h-5 text-primary-400" />, label: "Learn at your pace", sub: "Lifetime access" },
              { icon: <Users className="w-5 h-5 text-purple-400" />, label: `${totalStudents}+ students`, sub: "Already enrolled" },
              { icon: <Star className="w-5 h-5 text-green-400 fill-green-400" />, label: "4.8 avg. rating", sub: "Across all courses" },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-2xl p-5 border border-(--border-soft) flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-(--surface) flex items-center justify-center">{item.icon}</div>
                <p className="text-(--text) text-sm font-semibold" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{item.label}</p>
                <p className="text-[var(--text-muted)] text-xs">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-py border-t border-(--border-soft)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl border border-(--border-soft) p-6 sm:p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-gold-500/5 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-gold-500/20 mb-6">
                <span className="text-xs font-medium text-gold-400 uppercase tracking-wider">Not sure which course?</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-(--text) mb-4"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              >
                Talk to our team first
              </h2>
              <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-xl mx-auto mb-8">
                We'll help you pick the right course based on your goals, experience, and career plans — at no charge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm transition-all shadow-lg shadow-primary-500/25"
                >
                  Get a free consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/study"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl glass border border-(--border) text-(--text) font-semibold text-sm hover:border-(--border-strong) transition-all"
                >
                  Read free articles first
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
