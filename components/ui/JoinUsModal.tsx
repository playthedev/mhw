"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, Loader2, CheckCircle2, Upload, FileText } from "lucide-react"
import { toast } from "sonner"
import type { JoinUsCategory } from "@/lib/models"

export type { JoinUsCategory }

interface JoinUsModalProps {
  category: JoinUsCategory | null
  onClose: () => void
}

const categoryConfig: Record<JoinUsCategory, { title: string; description: string }> = {
  professional: {
    title: "Join as a Professional",
    description: "Apply to join our team of consulting professionals.",
  },
  internship: {
    title: "Apply for an Internship",
    description: "Kickstart your career with hands-on experience.",
  },
  career: {
    title: "Explore Career Opportunities",
    description: "Tell us about the role you're looking for.",
  },
}

const initialForm = {
  name: "",
  mobile: "",
  email: "",
  professionSector: "",
  yearsOfExperience: "",
  qualification: "",
  position: "",
  why: "",
}

const inputClass =
  "w-full px-4 py-3 rounded-xl glass border border-(--border) text-(--text) placeholder-[var(--text-muted)] focus:outline-none focus:border-primary-500/40 bg-transparent transition-colors text-sm"

async function uploadResume(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  if (!cloudName || !uploadPreset) {
    throw new Error("Resume upload is not configured")
  }

  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", uploadPreset)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: "POST",
    body: formData,
  })

  if (!res.ok) throw new Error("Failed to upload resume")
  const data = await res.json()
  return data.secure_url as string
}

export default function JoinUsModal({ category, onClose }: JoinUsModalProps) {
  const [form, setForm] = useState(initialForm)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!category) return null
  const config = categoryConfig[category]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume must be under 5MB")
      return
    }
    setResumeFile(file)
  }

  const resetAndClose = () => {
    setForm(initialForm)
    setResumeFile(null)
    setSubmitted(false)
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      let resumeUrl: string | undefined
      if (resumeFile) {
        try {
          resumeUrl = await uploadResume(resumeFile)
        } catch {
          toast.error("Resume upload failed. Submitting application without resume.")
        }
      }

      const res = await fetch("/api/join-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, ...form, resumeUrl }),
      })

      if (!res.ok) throw new Error("Failed to submit application")
      setSubmitted(true)
      toast.success("Application submitted! We'll be in touch soon.")
    } catch {
      toast.error("Failed to submit. Please try again or email us directly.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={resetAndClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto glass-card rounded-2xl border border-(--border-soft) p-6 sm:p-8"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={resetAndClose}
            className="absolute right-4 top-4 p-2 rounded-lg text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface) transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-(--text) mb-3" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                Application Sent!
              </h3>
              <p className="text-[var(--text-muted)]">We&apos;ll review your application and get back to you soon.</p>
              <button
                onClick={resetAndClose}
                className="mt-6 text-sm text-primary-400 hover:text-primary-300 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-(--text) mb-1" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                  {config.title}
                </h2>
                <p className="text-sm text-[var(--text-muted)]">{config.description}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-2">Name *</label>
                  <input required name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-2">Mobile Number *</label>
                  <input required type="tel" name="mobile" value={form.mobile} onChange={handleChange} placeholder="+91 00000 00000" className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-2">Email ID *</label>
                <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
              </div>

              {(category === "professional" || category === "internship") && (
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-2">Profession / Sector *</label>
                  <input required name="professionSector" value={form.professionSector} onChange={handleChange} placeholder="e.g. Accounting, Compliance" className={inputClass} />
                </div>
              )}

              {category === "professional" && (
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-2">Years of Experience *</label>
                  <input required name="yearsOfExperience" value={form.yearsOfExperience} onChange={handleChange} placeholder="e.g. 3 years" className={inputClass} />
                </div>
              )}

              {category === "career" && (
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-2">Position Applying For *</label>
                  <input required name="position" value={form.position} onChange={handleChange} placeholder="e.g. Tax Consultant" className={inputClass} />
                </div>
              )}

              {(category === "internship" || category === "career") && (
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-2">Qualification *</label>
                  <input required name="qualification" value={form.qualification} onChange={handleChange} placeholder="e.g. B.Com, CA Inter" className={inputClass} />
                </div>
              )}

              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-2">Describe Why? (in 100 words) *</label>
                <textarea
                  required name="why" value={form.why} onChange={handleChange}
                  rows={4} placeholder="Tell us why you'd like to join MHW Consultancy..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-2">Resume (PDF/DOC, max 5MB)</label>
                <label className="flex items-center gap-3 px-4 py-3 rounded-xl glass border border-(--border) text-sm cursor-pointer hover:border-primary-500/40 transition-colors">
                  {resumeFile ? <FileText className="w-4 h-4 text-primary-400 flex-shrink-0" /> : <Upload className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />}
                  <span className={resumeFile ? "text-(--text) truncate" : "text-[var(--text-muted)]"}>
                    {resumeFile ? resumeFile.name : "Choose a file to upload"}
                  </span>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                </label>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 shimmer-btn text-white font-semibold px-6 py-4 rounded-xl hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-primary-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
