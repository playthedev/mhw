"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Loader2, UserPlus, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || "Registration failed")
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
          Check your inbox!
        </h2>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
          We sent a verification link to <strong className="text-(--text)">{form.email}</strong>. Click it to activate your account.
        </p>
        <p className="text-xs text-[var(--text-muted)]">
          Didn&apos;t get it? Check your spam folder or{" "}
          <Link href="/login" className="text-primary-400 hover:text-primary-300 transition-colors">
            try signing in
          </Link>
          .
        </p>
      </div>
    )
  }

  const passwordStrength = form.password.length === 0 ? null : form.password.length < 8 ? "weak" : form.password.length < 12 ? "good" : "strong"
  const strengthColor = { weak: "bg-red-500", good: "bg-yellow-500", strong: "bg-green-500" }
  const strengthWidth = { weak: "w-1/3", good: "w-2/3", strong: "w-full" }

  return (
    <div className="glass-card rounded-2xl p-8 border border-(--border)">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-(--text) mb-2" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          Create your account
        </h1>
        <p className="text-[var(--text-muted)] text-sm">Join MHW Consultancy and start learning</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-[var(--text-muted)] mb-2">Full Name</label>
          <input
            required name="name" value={form.name} onChange={handleChange}
            placeholder="Your full name" autoComplete="name"
            className="w-full px-4 py-3 rounded-xl glass border border-(--border) text-(--text) placeholder-[var(--text-muted)] focus:outline-none focus:border-primary-500/40 bg-transparent transition-colors text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-[var(--text-muted)] mb-2">Email Address</label>
          <input
            required type="email" name="email" value={form.email} onChange={handleChange}
            placeholder="you@example.com" autoComplete="email"
            className="w-full px-4 py-3 rounded-xl glass border border-(--border) text-(--text) placeholder-[var(--text-muted)] focus:outline-none focus:border-primary-500/40 bg-transparent transition-colors text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-[var(--text-muted)] mb-2">Password</label>
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
          {passwordStrength && (
            <div className="mt-2">
              <div className="h-1 bg-(--surface) rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-300 ${strengthColor[passwordStrength]} ${strengthWidth[passwordStrength]}`} />
              </div>
              <p className={`text-xs mt-1 ${passwordStrength === "weak" ? "text-red-400" : passwordStrength === "good" ? "text-yellow-400" : "text-green-400"}`}>
                {passwordStrength === "weak" ? "Weak password" : passwordStrength === "good" ? "Good password" : "Strong password"}
              </p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm text-[var(--text-muted)] mb-2">Confirm Password</label>
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
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm text-[var(--text-muted)] mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  )
}
