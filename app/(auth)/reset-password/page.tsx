"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, CheckCircle2, XCircle, KeyRound } from "lucide-react"
import { toast } from "sonner"

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="glass-card rounded-2xl p-8 border border-(--border) animate-pulse h-[420px]" />}>
      <ResetPasswordContent />
    </Suspense>
  )
}

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [form, setForm] = useState({ password: "", confirmPassword: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!token) {
    return (
      <div className="glass-card rounded-2xl p-8 border border-(--border) text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
          <XCircle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-(--text) mb-3" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          Invalid Link
        </h2>
        <p className="text-[var(--text-muted)] text-sm mb-6">This reset link is missing or malformed.</p>
        <Link href="/forgot-password" className="text-primary-400 hover:text-primary-300 text-sm transition-colors">
          Request a new reset link
        </Link>
      </div>
    )
  }

  if (success) {
    return (
      <div className="glass-card rounded-2xl p-8 border border-(--border) text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-(--text) mb-3" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          Password Updated!
        </h2>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
          Your password has been successfully reset. You can now sign in with your new password.
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: form.password }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || "Reset failed")
        if (data.error?.includes("expired")) {
          setTimeout(() => router.push("/forgot-password"), 2000)
        }
        return
      }
      setSuccess(true)
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card rounded-2xl p-8 border border-(--border)">
      <div className="mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-5">
          <KeyRound className="w-6 h-6 text-primary-400" />
        </div>
        <h1 className="text-2xl font-bold text-(--text) mb-2" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          Set new password
        </h1>
        <p className="text-[var(--text-muted)] text-sm">Choose a strong password for your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-[var(--text-muted)] mb-2">New Password</label>
          <div className="relative">
            <input
              required name="password" value={form.password} onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters" autoComplete="new-password"
              className="w-full px-4 py-3 rounded-xl glass border border-(--border) text-(--text) placeholder-[var(--text-muted)] focus:outline-none focus:border-primary-500/40 bg-transparent transition-colors text-sm pr-12"
            />
            <button
              type="button" onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-(--text) transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm text-[var(--text-muted)] mb-2">Confirm New Password</label>
          <input
            required name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Repeat your password" autoComplete="new-password"
            className={`w-full px-4 py-3 rounded-xl glass border text-(--text) placeholder-[var(--text-muted)] focus:outline-none bg-transparent transition-colors text-sm ${
              form.confirmPassword && form.password !== form.confirmPassword
                ? "border-red-500/40 focus:border-red-500/60"
                : "border-(--border) focus:border-primary-500/40"
            }`}
          />
          {form.confirmPassword && form.password !== form.confirmPassword && (
            <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
          )}
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full flex items-center justify-center gap-2 shimmer-btn text-white font-semibold px-6 py-3.5 rounded-xl hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-primary-500/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <KeyRound className="w-5 h-5" />}
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  )
}
