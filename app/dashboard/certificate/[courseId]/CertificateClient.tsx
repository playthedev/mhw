"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Download, ArrowLeft, Trophy, Share2, Check, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface Props {
  courseName: string
  studentName: string
  instructorName: string
  instructorRole: string
  completedAt: string
  courseId: string
  duration: string
}

export default function CertificateClient({
  courseName, studentName, instructorName, instructorRole, completedAt, courseId, duration,
}: Props) {
  const certRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [printing, setPrinting] = useState(false)

  const handlePrint = () => {
    if (printing) return
    setPrinting(true)
    window.print()
    setTimeout(() => setPrinting(false), 1500)
  }

  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: `Certificate — ${courseName}`, url })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        toast.success("Certificate link copied!")
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      // user cancelled the native share sheet — ignore
    }
  }

  return (
    <div className="print-area min-h-screen bg-[var(--bg-deep)]">
      {/* Controls — hidden on print */}
      <div className="print:hidden max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link href={`/dashboard/courses/${courseId}`} className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-(--text) transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to course
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-sm text-[var(--text-muted)] hover:text-(--text) border border-(--border) hover:border-(--border-strong) px-4 py-2 rounded-xl transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
            {copied ? "Copied!" : "Share"}
          </button>
          <button
            onClick={handlePrint}
            disabled={printing}
            className="flex-1 sm:flex-none shimmer-btn flex items-center justify-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {printing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {printing ? "Preparing..." : "Download / Print"}
          </button>
        </div>
      </div>

      {/* Certificate */}
      <div className="print:m-0 max-w-5xl mx-auto px-4 pb-12">
        <div
          ref={certRef}
          className="relative bg-[var(--bg-alt)] border-2 border-gold-500/30 rounded-3xl overflow-hidden print:rounded-none print:border-0"
          style={{ minHeight: "600px" }}
        >
          {/* Gold corner accents */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-gold-500/50 rounded-tl-3xl print:rounded-none" />
          <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-gold-500/50 rounded-tr-3xl print:rounded-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-gold-500/50 rounded-bl-3xl print:rounded-none" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-gold-500/50 rounded-br-3xl print:rounded-none" />

          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/4 rounded-full blur-3xl" />
          </div>

          <div className="relative px-5 sm:px-12 py-10 sm:py-16 text-center">
            {/* Logo / organisation */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <Trophy className="w-6 h-6 text-(--text)" />
              </div>
              <div className="text-left">
                <p className="text-(--text) font-bold text-lg" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>MHW Consultancy</p>
                <p className="text-[var(--text-muted)] text-xs">Professional Education & Training</p>
              </div>
            </div>

            {/* Certificate title */}
            <p className="text-gold-400 text-sm font-semibold tracking-[0.25em] uppercase mb-3">Certificate of Completion</p>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mx-auto mb-8" />

            {/* This certifies */}
            <p className="text-[var(--text-muted)] text-sm mb-3">This is to certify that</p>
            <h1
              className="text-4xl sm:text-5xl font-bold text-(--text) mb-3"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", letterSpacing: "-0.02em" }}
            >
              {studentName}
            </h1>
            <p className="text-[var(--text-muted)] text-sm mb-2">has successfully completed the</p>
            <h2
              className="cert-course-name text-2xl sm:text-3xl font-bold mb-2"
              style={{
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                background: "linear-gradient(135deg, #f4c542 0%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {courseName}
            </h2>
            <p className="text-[var(--text-muted)] text-sm mb-10">
              a {duration} professional training programme · completed on {completedAt}
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-(--surface)" />
              <div className="w-3 h-3 rounded-full bg-gold-500/30 border border-gold-500/50" />
              <div className="flex-1 h-px bg-(--surface)" />
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-6 sm:gap-16 max-w-md mx-auto">
              <div className="text-center">
                <div className="h-12 flex items-end justify-center mb-2">
                  <p className="text-(--text) font-bold text-lg italic" style={{ fontFamily: "Georgia, serif" }}>
                    {instructorName.split(" ")[0]}
                  </p>
                </div>
                <div className="w-full h-px bg-(--surface-hover) mb-2" />
                <p className="text-(--text) text-xs font-semibold">{instructorName}</p>
                <p className="text-[var(--text-muted)] text-xs">{instructorRole}</p>
              </div>
              <div className="text-center">
                <div className="h-12 flex items-end justify-center mb-2">
                  <p className="text-(--text) font-bold text-lg italic" style={{ fontFamily: "Georgia, serif" }}>MHW</p>
                </div>
                <div className="w-full h-px bg-(--surface-hover) mb-2" />
                <p className="text-(--text) text-xs font-semibold">MHW Consultancy</p>
                <p className="text-[var(--text-muted)] text-xs">Authorised Signatory</p>
              </div>
            </div>

            {/* Credential ID */}
            <p className="text-[var(--text-faint)] text-xs mt-10">
              Credential ID: MHW-{courseId.slice(0, 8).toUpperCase()}-{Date.now().toString(36).toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page { margin: 0; size: auto; }
          body { background: white; }
          .print\\:hidden { display: none !important; }
          .cert-course-name {
            background: none !important;
            -webkit-background-clip: unset !important;
            background-clip: unset !important;
            -webkit-text-fill-color: #ca9a04 !important;
            color: #ca9a04 !important;
          }
        }
      `}</style>
    </div>
  )
}
