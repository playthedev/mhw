"use client"

import { motion } from "framer-motion"
import {
  ArrowLeft, Clock, Users, Star, CheckCircle2, ChevronDown, ChevronUp,
  Play, Trophy, ArrowRight, BookOpen, Target, Lock, Eye,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { createPortal } from "react-dom"
import { formatPrice, formatDate, hasActiveOffer } from "@/lib/utils"
import EnrollButton from "@/components/ui/EnrollButton"
import type { Course } from "@/lib/courses"

export default function CourseDetailClient({ course, related, isEnrolled }: { course: Course; related: Course[]; isEnrolled: boolean }) {
  const [openModule, setOpenModule] = useState<number | null>(0)
  const [previewLesson, setPreviewLesson] = useState<{ title: string } | null>(null)

  const totalLessons = course.syllabus.reduce((s, m) => s + m.lessons.length, 0)
  const freeLessons = course.syllabus.flatMap((m) => m.lessons).filter((l) => l.free)
  const totalDurationMin = course.syllabus
    .flatMap((m) => m.lessons)
    .reduce((s, l) => {
      const n = parseInt(l.duration)
      return s + (isNaN(n) ? 0 : n)
    }, 0)
  const totalHours = Math.floor(totalDurationMin / 60)
  const totalMins = totalDurationMin % 60

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className={`relative pt-32 pb-24 bg-gradient-to-br ${course.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-[var(--bg)]/75" />
        <div className="absolute inset-0 dot-grid opacity-20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-(--text)/70 hover:text-(--text) transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Courses
            </Link>

            <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
              {/* Left */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="text-xs font-medium text-primary-300 bg-primary-500/15 px-3 py-1.5 rounded-full border border-primary-500/20">{course.category}</span>
                  <span className="text-xs font-medium text-(--text)/60 bg-(--surface-hover) px-3 py-1.5 rounded-full">{course.level}</span>
                  {course.badge && (
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${course.badgeColor}`}>{course.badge}</span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--text) mb-5 leading-tight" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                  {course.title}
                </h1>
                <p className="text-(--text)/70 text-base sm:text-lg mb-8 max-w-2xl">{course.description}</p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-sm mb-6">
                  <div className="flex items-center gap-1.5 text-(--text)/70">
                    <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                    <span className="text-(--text) font-semibold">{course.rating}</span>
                    <span>({course.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-(--text)/70">
                    <Users className="w-4 h-4" /> {course.students > 0 ? `${course.students.toLocaleString("en-IN")} students` : "Be first to enroll"}
                  </div>
                  <div className="flex items-center gap-1.5 text-(--text)/70">
                    <Clock className="w-4 h-4" /> {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-(--text)/70">
                    <BookOpen className="w-4 h-4" /> {totalLessons} lessons · {totalHours}h {totalMins}m
                  </div>
                </div>

                {freeLessons.length > 0 && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                    <Eye className="w-3.5 h-3.5" /> {freeLessons.length} free preview lesson{freeLessons.length > 1 ? "s" : ""} available
                  </div>
                )}

                {/* Instructor */}
                <div className="mt-8 flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white font-bold`}>
                    {course.instructorAvatar}
                  </div>
                  <div>
                    <p className="text-(--text) text-sm font-semibold">{course.instructor}</p>
                    <p className="text-(--text)/60 text-xs">{course.instructorRole} · MHW Consultancy</p>
                  </div>
                </div>
              </div>

              {/* Right — enroll card (desktop) */}
              <div className="hidden lg:block">
                <EnrollCard course={course} onPreview={setPreviewLesson} isEnrolled={isEnrolled} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Mobile enroll bar ── */}
      <div className="lg:hidden sticky top-16 z-30 bg-[var(--bg)]/95 backdrop-blur-xl border-b border-(--border-soft) px-4 py-3 flex items-center justify-between gap-4">
        {isEnrolled ? (
          <>
            <span className="flex items-center gap-1.5 text-sm font-medium text-green-400 truncate">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> <span className="truncate">You own this course</span>
            </span>
            <Link
              href={`/dashboard/courses/${course.id}`}
              className="shimmer-btn flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl flex-shrink-0"
            >
              Continue learning <ArrowRight className="w-4 h-4" />
            </Link>
          </>
        ) : (
          <>
            <span className="flex items-baseline gap-2">
              <span className="text-(--text) font-bold text-xl">{formatPrice(course.price)}</span>
              {hasActiveOffer(course) && (
                <span className="text-xs text-[var(--text-muted)] line-through">{formatPrice(course.originalPrice!)}</span>
              )}
            </span>
            <EnrollButton courseId={course.id} courseName={course.title} price={course.price} />
          </>
        )}
      </div>

      {/* ── Body ── */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12">
            <div className="space-y-12 min-w-0">

              {/* About */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                <SectionHeader icon={<Target className="w-5 h-5 text-primary-400" />} title="About this course" />
                <p className="text-[var(--text-subtle)] leading-relaxed">{course.about}</p>
              </motion.div>

              {/* What you'll learn */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
                <SectionHeader icon={<Trophy className="w-5 h-5 text-gold-400" />} title="What you'll learn" />
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-3 glass-card rounded-xl p-4 border border-(--border-soft)">
                      <CheckCircle2 className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-subtle)] text-sm leading-relaxed">{outcome}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Syllabus */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                <SectionHeader icon={<BookOpen className="w-5 h-5 text-purple-400" />} title="Course syllabus" />
                <p className="text-[var(--text-muted)] text-sm mb-5">
                  {course.syllabus.length} modules · {totalLessons} lessons ·{" "}
                  {totalHours > 0 ? `${totalHours}h ` : ""}{totalMins}m total
                </p>
                <div className="space-y-3">
                  {course.syllabus.map((mod, i) => (
                    <div key={mod.title} className="glass-card rounded-xl border border-(--border-soft) overflow-hidden">
                      <button
                        onClick={() => setOpenModule(openModule === i ? null : i)}
                        className="w-full flex items-center justify-between gap-4 p-5 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 text-xs font-bold flex-shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-(--text) text-sm font-medium">{mod.title}</span>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-xs text-[var(--text-muted)]">{mod.lessons.length} lessons</span>
                          {openModule === i
                            ? <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" />
                            : <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />}
                        </div>
                      </button>

                      {openModule === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="border-t border-(--border-soft) px-5 py-3 space-y-1"
                        >
                          {mod.lessons.map((lesson, li) => (
                            <div key={lesson.title} className="flex items-center gap-3 py-2">
                              {isEnrolled ? (
                                <Link
                                  href={`/dashboard/courses/${course.id}?module=${i}&lesson=${li}`}
                                  className="flex items-center gap-3 flex-1 min-w-0 group"
                                >
                                  <Play className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
                                  <span className="text-[var(--text-subtle)] text-sm group-hover:text-(--text) transition-colors flex-1 min-w-0 truncate">{lesson.title}</span>
                                  <span className="text-xs text-[var(--text-faint)] flex-shrink-0">{lesson.duration}</span>
                                </Link>
                              ) : lesson.free ? (
                                <button
                                  onClick={() => setPreviewLesson(lesson)}
                                  className="flex items-center gap-3 flex-1 min-w-0 group text-left"
                                >
                                  <Play className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                                  <span className="text-[var(--text-subtle)] text-sm group-hover:text-(--text) transition-colors flex-1 min-w-0 truncate">{lesson.title}</span>
                                  <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full flex-shrink-0">Preview</span>
                                  <span className="text-xs text-[var(--text-faint)] flex-shrink-0">{lesson.duration}</span>
                                </button>
                              ) : (
                                <>
                                  <Lock className="w-3.5 h-3.5 text-[var(--text-faint)] flex-shrink-0" />
                                  <span className="text-[var(--text-muted)] text-sm flex-1 min-w-0 truncate">{lesson.title}</span>
                                  <span className="text-xs text-[var(--text-faint)] flex-shrink-0">{lesson.duration}</span>
                                </>
                              )}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Requirements */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
                <SectionHeader icon={<CheckCircle2 className="w-5 h-5 text-green-400" />} title="Requirements" />
                <ul className="space-y-2">
                  {course.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3 text-[var(--text-subtle)] text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Instructor */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
                <SectionHeader icon={<Users className="w-5 h-5 text-cyan-400" />} title="Your instructor" />
                <div className="glass-card rounded-2xl border border-(--border-soft) p-6 flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                    {course.instructorAvatar}
                  </div>
                  <div>
                    <p className="text-(--text) font-semibold mb-0.5" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{course.instructor}</p>
                    <p className="text-[var(--text-muted)] text-sm mb-3">{course.instructorRole} · MHW Consultancy</p>
                    <p className="text-[var(--text-subtle)] text-sm leading-relaxed">{course.instructorBio}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Desktop sticky sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-5">
                <EnrollCard course={course} onPreview={setPreviewLesson} isEnrolled={isEnrolled} />
                {related.length > 0 && (
                  <div className="glass-card rounded-2xl border border-(--border-soft) p-6">
                    <h3 className="text-(--text) font-semibold mb-4 text-sm" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                      You might also like
                    </h3>
                    <div className="space-y-4">
                      {related.map((c) => (
                        <Link key={c.id} href={`/courses/${c.id}`} className="flex items-start gap-3 group">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.gradient} border border-(--border) flex items-center justify-center flex-shrink-0`}>
                            <Play className="w-4 h-4 text-(--text)/70 ml-0.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-(--text) text-xs font-medium line-clamp-2 group-hover:text-primary-300 transition-colors mb-1">{c.title}</p>
                            <p className="text-[var(--text-muted)] text-xs">{formatPrice(c.price)}</p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-primary-400 flex-shrink-0 mt-1 transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-card rounded-2xl border border-primary-500/15 p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left"
          >
            <div>
              <h3 className="text-(--text) font-bold text-xl sm:text-2xl mb-2" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                Ready to get started?
              </h3>
              <p className="text-[var(--text-muted)] text-sm sm:text-base">
                {course.students > 0
                  ? `Join ${course.students.toLocaleString("en-IN")} students already enrolled in this course.`
                  : "Be the first to enroll in this course."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
              <EnrollButton courseId={course.id} courseName={course.title} price={course.price} size="large" className="min-w-[200px]" />
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass border border-(--border) hover:border-(--border-strong) text-(--text) text-sm font-medium transition-all">
                Ask a question
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Preview lesson modal ── */}
      {previewLesson && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: "rgba(10,10,15,0.9)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setPreviewLesson(null) }}
        >
          <div className="glass-card w-full max-w-3xl rounded-2xl border border-(--border) overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-(--border-soft)">
              <div className="min-w-0">
                <p className="text-xs text-green-400 font-medium mb-0.5">Free Preview</p>
                <h3 className="text-(--text) font-semibold text-sm truncate">{previewLesson.title}</h3>
              </div>
              <button onClick={() => setPreviewLesson(null)} className="text-[var(--text-muted)] hover:text-(--text) transition-colors p-1.5 flex-shrink-0">
                ✕
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&autoplay=1&modestbranding=1"
                title={previewLesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[var(--text-muted)] text-sm">Liked what you saw? Enroll to access all {totalLessons} lessons.</p>
              <EnrollButton courseId={course.id} courseName={course.title} price={course.price} />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-xl bg-(--surface) border border-(--border-soft) flex items-center justify-center">{icon}</div>
      <h2 className="text-(--text) font-bold text-xl" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{title}</h2>
    </div>
  )
}

function EnrollCard({ course, onPreview, isEnrolled }: { course: Course; onPreview: (l: { title: string }) => void; isEnrolled: boolean }) {
  const freeLessons = course.syllabus.flatMap((m) => m.lessons).filter((l) => l.free)
  const totalLessons = course.syllabus.reduce((s, m) => s + m.lessons.length, 0)

  return (
    <div className="glass-card rounded-2xl border border-(--border-soft) overflow-hidden">
      <div className={`h-40 bg-gradient-to-br ${course.gradient} flex items-center justify-center relative`}>
        <div className="w-14 h-14 rounded-2xl bg-(--surface-hover) flex items-center justify-center">
          <Play className="w-7 h-7 text-(--text) ml-0.5" />
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl px-3 py-2 text-xs text-(--text)/80 text-center">
            {totalLessons} lessons · {course.duration}
          </div>
        </div>
      </div>

      <div className="p-6">
        {isEnrolled ? (
          <>
            <div className="flex items-center gap-2 mb-4 text-green-400 text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4" /> You own this course
            </div>

            <Link
              href={`/dashboard/courses/${course.id}`}
              className="shimmer-btn w-full flex items-center justify-center gap-2 text-sm font-semibold text-white px-5 py-3.5 rounded-xl mb-3"
            >
              Continue learning <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={`/dashboard/certificate/${course.id}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gold-500/25 text-gold-400 text-xs font-medium hover:bg-gold-500/10 transition-colors mb-5"
            >
              <Trophy className="w-3.5 h-3.5" /> View certificate
            </Link>
          </>
        ) : (
          <>
            {hasActiveOffer(course) && (
              <div className="mb-4 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                50% off · Register before {formatDate(course.offerEndsAt!)}
                {course.batchStartsAt && <> · Batch starts {formatDate(course.batchStartsAt)}</>}
              </div>
            )}

            <div className="flex items-baseline justify-between mb-2">
              <span className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-(--text)">{formatPrice(course.price)}</span>
                {hasActiveOffer(course) && (
                  <span className="text-sm text-[var(--text-muted)] line-through">{formatPrice(course.originalPrice!)}</span>
                )}
              </span>
              <span className="text-xs text-[var(--text-muted)]">One-time · GST invoice included</span>
            </div>

            {freeLessons.length > 0 && (
              <button
                onClick={() => onPreview(freeLessons[0])}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-green-500/25 text-green-400 text-xs font-medium hover:bg-green-500/10 transition-colors mb-3"
              >
                <Eye className="w-3.5 h-3.5" /> Watch free preview
              </button>
            )}

            <EnrollButton courseId={course.id} courseName={course.title} price={course.price} size="large" className="mb-3" />
          </>
        )}

        <Link href="/contact" className="block w-full text-center py-3 px-4 rounded-xl glass border border-(--border) hover:border-(--border-strong) text-(--text) text-sm font-medium transition-all mb-5">
          Ask us a question
        </Link>

        <div className="border-t border-(--border-soft) pt-5 space-y-2.5">
          {[
            { icon: <Clock className="w-3.5 h-3.5" />, text: `${course.duration} programme` },
            { icon: <BookOpen className="w-3.5 h-3.5" />, text: `${totalLessons} lessons · lifetime access` },
            { icon: <Trophy className="w-3.5 h-3.5" />, text: "Certificate of completion" },
            { icon: <Users className="w-3.5 h-3.5" />, text: "Expert instructor support" },
            { icon: <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />, text: `Rated ${course.rating} (${course.reviews} reviews)` },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 text-xs text-[var(--text-muted)]">
              <span className="text-primary-400">{icon}</span>{text}
            </div>
          ))}
        </div>

        <Link href="/refund-policy" className="block text-center text-xs text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors mt-4">
          30-day refund policy
        </Link>
      </div>
    </div>
  )
}
