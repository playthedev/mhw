"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, XCircle, Mail, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="glass-card rounded-2xl p-8 border border-(--border) animate-pulse h-[360px]" />}>
      <VerifyEmailContent />
    </Suspense>
  )
}

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const success = searchParams.get("success")
  const error = searchParams.get("error")

  const [email, setEmail] = useState("")
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setResending(true)
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        setResent(true)
        toast.success("Verification email sent!")
      } else {
        toast.error(data.error || "Failed to resend. Try again.")
      }
    } catch {
      toast.error("Something went wrong. Try again.")
    } finally {
      setResending(false)
    }
  }

  if (success) {
    return (
      <div className="glass-card rounded-2xl p-8 border border-(--border) text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-(--text) mb-3" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          Email Verified!
        </h2>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
          Your email address has been verified. You can now sign in to your account.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center shimmer-btn text-white font-semibold px-6 py-3 rounded-xl hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-primary-500/20"
        >
          Sign In
        </Link>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass-card rounded-2xl p-8 border border-(--border) text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
          <XCircle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-(--text) mb-3" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          Verification Failed
        </h2>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
          This verification link is invalid or has expired.
        </p>

        {resent ? (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <p className="text-green-400 text-sm">New verification email sent! Check your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleResend} className="text-left space-y-3">
            <p className="text-[var(--text-muted)] text-xs text-center mb-3">Enter your email to get a new link</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-(--surface) border border-(--border) text-(--text) placeholder-[var(--text-muted)] text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
            />
            <button
              type="submit"
              disabled={resending}
              className="w-full shimmer-btn text-white font-semibold py-3 rounded-xl hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-primary-500/20 disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2"
            >
              {resending && <Loader2 className="w-4 h-4 animate-spin" />}
              {resending ? "Sending..." : "Resend Verification Email"}
            </button>
          </form>
        )}

        <Link href="/register" className="block text-[var(--text-muted)] hover:text-(--text) text-xs mt-4 transition-colors">
          Back to Register
        </Link>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-2xl p-8 border border-(--border) text-center">
      <div className="w-16 h-16 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-5">
        <Mail className="w-8 h-8 text-primary-400" />
      </div>
      <h2 className="text-2xl font-bold text-(--text) mb-3" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
        Check your email
      </h2>
      <p className="text-[var(--text-muted)] text-sm leading-relaxed">
        We sent a verification link to your email address. Click it to activate your account.
      </p>
      <p className="text-xs text-[var(--text-muted)] mt-4">Didn&apos;t receive it? Check your spam folder.</p>
    </div>
  )
}
