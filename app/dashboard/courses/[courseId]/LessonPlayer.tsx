"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  CheckCircle2, Circle, ChevronDown, ChevronUp, ArrowLeft,
  Trophy, Clock, BookOpen, Play, Lock,
} from "lucide-react"
import { toast } from "sonner"
import type { Course } from "@/lib/courses"

interface Props {
  course: Course
  enrollment: { id: string; enrolledAt: Date }
  initialModule: number
  initialLesson: number
  completedLessons: string[]
  userEmail: string
  userName: string
}

// Sample YouTube embed used as placeholder until real videos are uploaded
const SAMPLE_VIDEO_ID = "aqz-KE-bpKQ"

export default function LessonPlayer({
  course,
  initialModule,
  initialLesson,
  completedLessons: initialCompleted,
  userEmail,
  userName,
}: Props) {
  const router = useRouter()
  const [activeModule, setActiveModule] = useState(initialModule)
  const [activeLesson, setActiveLesson] = useState(initialLesson)
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([initialModule]))
  const [completed, setCompleted] = useState<Set<string>>(new Set(initialCompleted))
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Default the sidebar open on desktop, closed on mobile
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)")
    setSidebarOpen(mql.matches)
  }, [])

  const currentLesson = course.syllabus[activeModule]?.lessons[activeLesson]
  const lessonKey = `${activeModule}-${activeLesson}`

  const totalLessons = course.syllabus.reduce((s, m) => s + m.lessons.length, 0)
  const progressPercent = Math.round((completed.size / totalLessons) * 100)
  const allDone = completed.size === totalLessons

  const markComplete = useCallback(async () => {
    if (completed.has(lessonKey)) return
    setCompleted((prev) => new Set([...prev, lessonKey]))

    try {
      const res = await fetch("/api/courses/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course.id, lessonKey }),
      })
      if (!res.ok) throw new Error("Failed to save progress")
    } catch {
      setCompleted((prev) => {
        const next = new Set(prev)
        next.delete(lessonKey)
        return next
      })
      toast.error("Couldn't save your progress. Please try again.")
    }
  }, [lessonKey, completed, course.id])

  const goToLesson = (mi: number, li: number) => {
    setActiveModule(mi)
    setActiveLesson(li)
    router.replace(`/dashboard/courses/${course.id}?module=${mi}&lesson=${li}`, { scroll: false })
    if (window.matchMedia("(max-width: 1023px)").matches) setSidebarOpen(false)
  }

  const goNext = () => {
    const mod = course.syllabus[activeModule]
    if (activeLesson < mod.lessons.length - 1) {
      goToLesson(activeModule, activeLesson + 1)
    } else if (activeModule < course.syllabus.length - 1) {
      goToLesson(activeModule + 1, 0)
      setExpandedModules((prev) => new Set([...prev, activeModule + 1]))
    }
  }

  const toggleModule = (i: number) => {
    setExpandedModules((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <div className="relative flex h-[calc(100vh-64px)] overflow-hidden bg-[var(--bg-deep)]">
      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`${sidebarOpen ? "w-80 translate-x-0" : "w-80 -translate-x-full lg:w-0 lg:translate-x-0"} fixed lg:static inset-y-0 left-0 z-40 lg:z-auto flex-shrink-0 transition-all duration-300 overflow-hidden border-r border-(--border-soft) bg-[var(--bg-alt)] flex flex-col`}
      >
        {/* Sidebar header */}
        <div className="p-5 border-b border-(--border-soft)">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-(--text) transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h2 className="text-(--text) font-bold text-sm leading-snug mb-3" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
            {course.title}
          </h2>
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-1.5">
            <span>{completed.size}/{totalLessons} lessons</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-(--surface) rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {allDone && (
            <div className="mt-3 flex items-center gap-2 text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
              <Trophy className="w-3.5 h-3.5" />
              Course completed! <Link href={`/dashboard/certificate/${course.id}`} className="underline font-medium">Get certificate</Link>
            </div>
          )}
        </div>

        {/* Module list */}
        <div className="flex-1 overflow-y-auto py-3">
          {course.syllabus.map((mod, mi) => {
            const modCompleted = mod.lessons.filter((_, li) => completed.has(`${mi}-${li}`)).length
            return (
              <div key={mi} className="border-b border-(--border-soft) last:border-0">
                <button
                  onClick={() => toggleModule(mi)}
                  className="w-full flex items-start justify-between gap-3 px-5 py-3.5 text-left hover:bg-(--surface-faint) transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-(--text) text-xs font-semibold leading-snug mb-0.5 truncate">{mod.title}</p>
                    <p className="text-[var(--text-muted)] text-xs">{modCompleted}/{mod.lessons.length} completed</p>
                  </div>
                  {expandedModules.has(mi)
                    ? <ChevronUp className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
                    : <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
                  }
                </button>

                {expandedModules.has(mi) && (
                  <div className="pb-2">
                    {mod.lessons.map((lesson, li) => {
                      const key = `${mi}-${li}`
                      const isActive = mi === activeModule && li === activeLesson
                      const isDone = completed.has(key)
                      return (
                        <button
                          key={li}
                          onClick={() => goToLesson(mi, li)}
                          className={`w-full flex items-start gap-3 px-5 py-2.5 text-left transition-colors ${
                            isActive ? "bg-primary-500/10 border-r-2 border-primary-500" : "hover:bg-(--surface-faint)"
                          }`}
                        >
                          {isDone
                            ? <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            : isActive
                            ? <Play className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                            : <Circle className="w-4 h-4 text-[var(--text-faint)] flex-shrink-0 mt-0.5" />
                          }
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs leading-snug truncate ${isActive ? "text-(--text) font-medium" : "text-[var(--text-subtle)]"}`}>
                              {lesson.title}
                            </p>
                            <p className="text-[var(--text-faint)] text-xs mt-0.5">{lesson.duration}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-2 justify-between px-3 sm:px-5 py-3 border-b border-(--border-soft) bg-[var(--bg-alt)] flex-shrink-0">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="text-[var(--text-muted)] hover:text-(--text) transition-colors p-1.5 rounded-lg hover:bg-(--surface) flex-shrink-0"
            title="Toggle sidebar"
          >
            <BookOpen className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] min-w-0 flex-1 justify-center">
            <span className="hidden lg:inline flex-shrink-0">{course.title}</span>
            <span className="text-(--text) font-medium truncate">
              {activeModule + 1}.{activeLesson + 1} — {currentLesson?.title}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-[var(--text-muted)] hidden sm:inline">{progressPercent}% done</span>
            {allDone && (
              <Link
                href={`/dashboard/certificate/${course.id}`}
                className="flex items-center gap-1.5 text-xs font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20 px-3 py-1.5 rounded-full hover:bg-gold-500/15 transition-colors"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Certificate</span>
              </Link>
            )}
          </div>
        </div>

        {/* Video area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
            {/* Video player */}
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden mb-6 shadow-2xl">
              <iframe
                key={lessonKey}
                src={`https://www.youtube.com/embed/${SAMPLE_VIDEO_ID}?rel=0&modestbranding=1&autoplay=0`}
                title={currentLesson?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Lesson info + controls */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-[var(--text-muted)] bg-(--surface) px-2.5 py-1 rounded-full border border-(--border-soft)">
                    Module {activeModule + 1}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {currentLesson?.duration}
                  </span>
                </div>
                <h1 className="text-(--text) font-bold text-xl sm:text-2xl leading-snug" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                  {currentLesson?.title}
                </h1>
                <p className="text-[var(--text-muted)] text-sm mt-1">{course.syllabus[activeModule]?.title}</p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                {completed.has(lessonKey) ? (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4" /> Completed
                  </span>
                ) : (
                  <button
                    onClick={markComplete}
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary-400 bg-primary-500/20 border border-primary-500/30 hover:bg-primary-500/30 px-4 py-2 rounded-xl transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Mark complete
                  </button>
                )}
                <button
                  onClick={goNext}
                  className="shimmer-btn flex items-center gap-1.5 text-xs font-semibold text-white px-4 py-2 rounded-xl"
                >
                  Next lesson →
                </button>
              </div>
            </div>

            {/* About this lesson placeholder */}
            <div className="glass-card rounded-2xl border border-(--border-soft) p-6 mb-6">
              <h3 className="text-(--text) font-semibold mb-3 text-sm" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                About this lesson
              </h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                This lesson is part of <span className="text-(--text)">{course.syllabus[activeModule]?.title}</span> in the{" "}
                <span className="text-(--text)">{course.title}</span> course. Watch the video above and mark the lesson complete when you're done.
                Your progress is saved automatically.
              </p>
            </div>

            {/* Upcoming lessons */}
            <div className="glass-card rounded-2xl border border-(--border-soft) p-6">
              <h3 className="text-(--text) font-semibold mb-4 text-sm" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                Up next in this module
              </h3>
              <div className="space-y-2">
                {course.syllabus[activeModule]?.lessons.map((lesson, li) => {
                  const key = `${activeModule}-${li}`
                  const isActive = li === activeLesson
                  const isDone = completed.has(key)
                  return (
                    <button
                      key={li}
                      onClick={() => goToLesson(activeModule, li)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                        isActive ? "bg-primary-500/10 border border-primary-500/20" : "hover:bg-(--surface) border border-transparent"
                      }`}
                    >
                      {isDone
                        ? <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        : isActive
                        ? <Play className="w-4 h-4 text-primary-400 flex-shrink-0" />
                        : <Circle className="w-4 h-4 text-[var(--text-faint)] flex-shrink-0" />
                      }
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm truncate ${isActive ? "text-(--text) font-medium" : "text-[var(--text-subtle)]"}`}>{lesson.title}</p>
                      </div>
                      <span className="text-xs text-[var(--text-faint)] flex-shrink-0">{lesson.duration}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
