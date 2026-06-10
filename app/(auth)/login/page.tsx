"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react"
import { toast } from "sonner"

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="glass-card rounded-2xl p-8 border border-(--border) animate-pulse h-[420px]" />}>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  const [form, setForm] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        if (data.code === "EMAIL_NOT_VERIFIED") {
          toast.error(data.error, { duration: 6000 })
        } else {
          toast.error(data.error || "Login failed")
        }
        return
      }

      toast.success(`Welcome back, ${data.user.name}!`)
      const dest = data.user.role === "admin" ? "/admin" : (redirect === "/" ? "/" : redirect)
      router.push(dest)
      router.refresh()
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card rounded-2xl p-8 border border-(--border)">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-(--text) mb-2" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          Welcome back
        </h1>
        <p className="text-[var(--text-muted)] text-sm">Sign in to your MHW Consultancy account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-[var(--text-muted)] mb-2">Email Address</label>
          <input
            required type="email" name="email" value={form.email} onChange={handleChange}
            placeholder="you@example.com" autoComplete="email"
            className="w-full px-4 py-3 rounded-xl glass border border-(--border) text-(--text) placeholder-[var(--text-muted)] focus:outline-none focus:border-primary-500/40 bg-transparent transition-colors text-sm"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-[var(--text-muted)]">Password</label>
            <Link href="/forgot-password" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              required name="password" value={form.password} onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••" autoComplete="current-password"
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

        <button
          type="submit" disabled={loading}
          className="w-full flex items-center justify-center gap-2 shimmer-btn text-white font-semibold px-6 py-3.5 rounded-xl hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-primary-500/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="text-center text-sm text-[var(--text-muted)] mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
          Create one
        </Link>
      </p>
    </div>
  )
}
