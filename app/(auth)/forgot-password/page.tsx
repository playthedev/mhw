"use client"

import { useState } from "react"
import Link from "next/link"
import { Loader2, Send, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || "Something went wrong")
        return
      }
      setSubmitted(true)
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="glass-card rounded-2xl p-8 border border-(--border) text-center">
        <div className="w-16 h-16 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-primary-400" />
        </div>
        <h2 className="text-2xl font-bold text-(--text) mb-3" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          Reset link sent!
        </h2>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
          If an account exists for <strong className="text-(--text)">{email}</strong>, a reset link has been sent. Check your inbox and spam folder.
        </p>
        <Link href="/login" className="text-primary-400 hover:text-primary-300 text-sm transition-colors">
          Back to Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-2xl p-8 border border-(--border)">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-(--text) mb-2" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          Forgot your password?
        </h1>
        <p className="text-[var(--text-muted)] text-sm">Enter your email and we&apos;ll send you a reset link.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-[var(--text-muted)] mb-2">Email Address</label>
          <input
            required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" autoComplete="email"
            className="w-full px-4 py-3 rounded-xl glass border border-(--border) text-(--text) placeholder-[var(--text-muted)] focus:outline-none focus:border-primary-500/40 bg-transparent transition-colors text-sm"
          />
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full flex items-center justify-center gap-2 shimmer-btn text-white font-semibold px-6 py-3.5 rounded-xl hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-primary-500/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <p className="text-center text-sm text-[var(--text-muted)] mt-6">
        Remember your password?{" "}
        <Link href="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  )
}
