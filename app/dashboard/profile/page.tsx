"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Lock, Save, Loader2, CheckCircle2, Phone, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface Me {
  name: string
  email: string
  role: string
  phone?: string
  countryCode?: string
}

// Common country codes
const COUNTRY_CODES = [
  { code: "+91", country: "IN", label: "+91 India" },
  { code: "+1", country: "US", label: "+1 USA/Canada" },
  { code: "+44", country: "GB", label: "+44 UK" },
  { code: "+61", country: "AU", label: "+61 Australia" },
  { code: "+971", country: "AE", label: "+971 UAE" },
  { code: "+65", country: "SG", label: "+65 Singapore" },
  { code: "+60", country: "MY", label: "+60 Malaysia" },
  { code: "+966", country: "SA", label: "+966 Saudi Arabia" },
  { code: "+49", country: "DE", label: "+49 Germany" },
  { code: "+33", country: "FR", label: "+33 France" },
]

const NAME_MAX = 50
const PHONE_MAX = 15

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-xs text-red-400 mt-1.5">{msg}</p>
}

function CharCount({ value, max }: { value: string; max: number }) {
  const over = value.length > max
  return (
    <span className={cn("text-xs", over ? "text-red-400" : "text-[var(--text-muted)]")}>
      {value.length}/{max}
    </span>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const [me, setMe] = useState<Me | null>(null)

  // Form fields
  const [name, setName] = useState("")
  const [countryCode, setCountryCode] = useState("+91")
  const [phone, setPhone] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // UI state
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Field-level errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setMe(data.user)
          setName(data.user.name ?? "")
          setPhone(data.user.phone ?? "")
          setCountryCode(data.user.countryCode ?? "+91")
        }
      })
  }, [])

  const validate = (): boolean => {
    const errs: Record<string, string> = {}

    const trimmedName = name.trim()
    if (!trimmedName) {
      errs.name = "Name is required"
    } else if (trimmedName.length < 2) {
      errs.name = "Name must be at least 2 characters"
    } else if (trimmedName.length > NAME_MAX) {
      errs.name = `Name must be ${NAME_MAX} characters or fewer`
    } else if (!/^[a-zA-Z\s\-'.]+$/.test(trimmedName)) {
      errs.name = "Name can only contain letters, spaces, hyphens, apostrophes, and periods"
    }

    if (phone) {
      const digits = phone.replace(/\D/g, "")
      if (digits.length < 7) {
        errs.phone = "Phone number is too short"
      } else if (digits.length > PHONE_MAX) {
        errs.phone = `Phone number must be ${PHONE_MAX} digits or fewer`
      } else if (!/^\d[\d\s\-()]*$/.test(phone)) {
        errs.phone = "Phone number contains invalid characters"
      }
    }

    if (newPassword || currentPassword) {
      if (!currentPassword) {
        errs.currentPassword = "Current password is required to set a new password"
      }
      if (!newPassword) {
        errs.newPassword = "New password is required"
      } else if (newPassword.length < 8) {
        errs.newPassword = "New password must be at least 8 characters"
      } else if (newPassword.length > 128) {
        errs.newPassword = "Password is too long (max 128 characters)"
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
        errs.newPassword = "Password must include uppercase, lowercase, and a number"
      }
      if (newPassword && newPassword !== confirmPassword) {
        errs.confirmPassword = "Passwords do not match"
      }
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSaving(true)
    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          countryCode: phone ? countryCode : undefined,
          phone: phone ? phone.replace(/\s/g, "") : undefined,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        // Map API error back to field if possible
        if (data.error?.toLowerCase().includes("current password")) {
          setErrors({ currentPassword: data.error })
        } else if (data.error?.toLowerCase().includes("name")) {
          setErrors({ name: data.error })
        } else if (data.error?.toLowerCase().includes("phone")) {
          setErrors({ phone: data.error })
        } else {
          toast.error(data.error || "Update failed")
        }
        return
      }

      toast.success("Profile updated!")
      setSaved(true)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setErrors({})
      setMe((prev) => prev ? { ...prev, name: data.user.name, phone: data.user.phone, countryCode: data.user.countryCode } : prev)
      setTimeout(() => setSaved(false), 3000)
      window.dispatchEvent(new Event("profile:updated"))
    } catch {
      toast.error("Something went wrong. Try again.")
    } finally {
      setSaving(false)
    }
  }

  if (!me) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-primary-400 animate-spin" />
      </div>
    )
  }

  const initials = name.trim().split(/\s+/).filter(Boolean).map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?"

  const pwStrength = (pw: string) => {
    if (!pw) return null
    let score = 0
    if (pw.length >= 8) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[a-z]/.test(pw)) score++
    if (/\d/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++
    if (score <= 2) return { label: "Weak", color: "bg-red-500", width: "w-1/4" }
    if (score <= 3) return { label: "Fair", color: "bg-yellow-500", width: "w-2/4" }
    if (score === 4) return { label: "Good", color: "bg-blue-500", width: "w-3/4" }
    return { label: "Strong", color: "bg-green-500", width: "w-full" }
  }

  const strength = pwStrength(newPassword)

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-(--text) mb-2" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          My Profile
        </h1>
        <p className="text-[var(--text-muted)]">Manage your account information and password.</p>
      </div>

      {/* Avatar card */}
      <div className="glass-card rounded-2xl p-6 border border-(--border-soft) mb-6 flex items-center gap-5 overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-(--text) font-semibold text-lg truncate">{me.name}</p>
          <p className="text-[var(--text-muted)] text-sm truncate">{me.email}</p>
          <span className="inline-flex items-center mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-400 border border-primary-500/20 capitalize">
            {me.role}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Personal Info */}
        <div className="glass-card rounded-2xl p-6 border border-(--border-soft)">
          <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-(--border-soft)">
            <div className="w-8 h-8 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
              <User className="w-4 h-4 text-primary-400" />
            </div>
            <h2 className="text-(--text) font-semibold" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>Personal Information</h2>
          </div>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-[var(--text-muted)]">Full Name <span className="text-red-400">*</span></label>
                <CharCount value={name} max={NAME_MAX} />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  if (e.target.value.length <= NAME_MAX + 5) setName(e.target.value)
                  if (errors.name) setErrors((p) => ({ ...p, name: "" }))
                }}
                placeholder="Your full name"
                maxLength={NAME_MAX + 5}
                className={cn(
                  "w-full px-4 py-3 rounded-xl bg-(--surface) border text-(--text) placeholder-[var(--text-muted)] text-sm focus:outline-none focus:ring-1 transition-all",
                  errors.name
                    ? "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20"
                    : "border-(--border) focus:border-primary-500/50 focus:ring-primary-500/20"
                )}
              />
              <FieldError msg={errors.name} />
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-2">Email Address</label>
              <input
                type="email"
                value={me.email}
                disabled
                className="w-full px-4 py-3 rounded-xl bg-(--surface-faint) border border-(--border-soft) text-[var(--text-muted)] text-sm cursor-not-allowed"
              />
              <p className="text-xs text-[var(--text-muted)] mt-1.5">Email cannot be changed.</p>
            </div>

            {/* Phone */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
                  <Phone className="w-3.5 h-3.5" /> Phone Number <span className="text-[var(--text-faint)] text-xs">(optional)</span>
                </label>
                <CharCount value={phone} max={PHONE_MAX} />
              </div>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="flex-shrink-0 w-[72px] sm:w-[110px] px-2 sm:px-3 py-3 rounded-xl bg-(--surface) border border-(--border) text-(--text) text-sm focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code} className="bg-[var(--bg-alt)]">
                      {c.label}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^\d\s\-()+]/g, "")
                    if (val.replace(/\D/g, "").length <= PHONE_MAX) setPhone(val)
                    if (errors.phone) setErrors((p) => ({ ...p, phone: "" }))
                  }}
                  placeholder="98765 43210"
                  className={cn(
                    "flex-1 min-w-0 px-4 py-3 rounded-xl bg-(--surface) border text-(--text) placeholder-[var(--text-muted)] text-sm focus:outline-none focus:ring-1 transition-all",
                    errors.phone
                      ? "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20"
                      : "border-(--border) focus:border-primary-500/50 focus:ring-primary-500/20"
                  )}
                />
              </div>
              <FieldError msg={errors.phone} />
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="glass-card rounded-2xl p-6 border border-(--border-soft)">
          <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-(--border-soft)">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Lock className="w-4 h-4 text-purple-400" />
            </div>
            <h2 className="text-(--text) font-semibold" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>Change Password</h2>
          </div>
          <p className="text-xs text-[var(--text-muted)] mb-4">Leave all fields blank to keep your current password.</p>

          <div className="space-y-4">
            {/* Current password */}
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => {
                    if (e.target.value.length <= 128) setCurrentPassword(e.target.value)
                    if (errors.currentPassword) setErrors((p) => ({ ...p, currentPassword: "" }))
                  }}
                  placeholder="Enter current password"
                  autoComplete="current-password"
                  className={cn(
                    "w-full px-4 py-3 pr-11 rounded-xl bg-(--surface) border text-(--text) placeholder-[var(--text-muted)] text-sm focus:outline-none focus:ring-1 transition-all",
                    errors.currentPassword
                      ? "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20"
                      : "border-(--border) focus:border-primary-500/50 focus:ring-primary-500/20"
                  )}
                />
                <button type="button" onClick={() => setShowCurrent((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-(--text) transition-colors p-1">
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <FieldError msg={errors.currentPassword} />
            </div>

            {/* New password */}
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    if (e.target.value.length <= 128) setNewPassword(e.target.value)
                    if (errors.newPassword) setErrors((p) => ({ ...p, newPassword: "" }))
                  }}
                  placeholder="Min. 8 chars, upper + lower + number"
                  autoComplete="new-password"
                  className={cn(
                    "w-full px-4 py-3 pr-11 rounded-xl bg-(--surface) border text-(--text) placeholder-[var(--text-muted)] text-sm focus:outline-none focus:ring-1 transition-all",
                    errors.newPassword
                      ? "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20"
                      : "border-(--border) focus:border-primary-500/50 focus:ring-primary-500/20"
                  )}
                />
                <button type="button" onClick={() => setShowNew((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-(--text) transition-colors p-1">
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {newPassword && strength && (
                <div className="mt-2 space-y-1">
                  <div className="h-1 w-full rounded-full bg-(--surface) overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all duration-300", strength.color, strength.width)} />
                  </div>
                  <p className={cn("text-xs", {
                    "text-red-400": strength.label === "Weak",
                    "text-yellow-400": strength.label === "Fair",
                    "text-blue-400": strength.label === "Good",
                    "text-green-400": strength.label === "Strong",
                  })}>Password strength: {strength.label}</p>
                </div>
              )}
              <FieldError msg={errors.newPassword} />
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    if (e.target.value.length <= 128) setConfirmPassword(e.target.value)
                    if (errors.confirmPassword) setErrors((p) => ({ ...p, confirmPassword: "" }))
                  }}
                  placeholder="Repeat new password"
                  autoComplete="new-password"
                  className={cn(
                    "w-full px-4 py-3 pr-11 rounded-xl bg-(--surface) border text-(--text) placeholder-[var(--text-muted)] text-sm focus:outline-none focus:ring-1 transition-all",
                    errors.confirmPassword
                      ? "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20"
                      : confirmPassword && confirmPassword === newPassword
                        ? "border-green-500/40 focus:border-green-500/50 focus:ring-green-500/20"
                        : "border-(--border) focus:border-primary-500/50 focus:ring-primary-500/20"
                  )}
                />
                <button type="button" onClick={() => setShowConfirm((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-(--text) transition-colors p-1">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && confirmPassword === newPassword && !errors.confirmPassword && (
                <p className="text-xs text-green-400 mt-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Passwords match
                </p>
              )}
              <FieldError msg={errors.confirmPassword} />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 shimmer-btn text-white font-semibold px-8 py-3.5 rounded-xl hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-primary-500/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : saved ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Save className="w-5 h-5" />}
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </form>
    </div>
  )
}
