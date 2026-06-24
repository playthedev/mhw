"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, BookOpen, LogOut, User, UserCog, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import ThemeToggle from "@/components/theme/ThemeToggle"
import Logo from "@/components/ui/Logo"

const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  // { label: "Courses", href: "/courses", icon: BookOpen },
  { label: "Profile", href: "/dashboard/profile", icon: UserCog },
]

export default function DashboardHeader({ initialName }: { initialName: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [name, setName] = useState(initialName)
  const [loggingOut, setLoggingOut] = useState(false)

  const fetchName = () => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => { if (data.user?.name) setName(data.user.name) })
      .catch(() => {})
  }

  // Re-fetch on navigation
  useEffect(() => { fetchName() }, [pathname])

  // Re-fetch when profile page fires the "profile:updated" event
  useEffect(() => {
    window.addEventListener("profile:updated", fetchName)
    return () => window.removeEventListener("profile:updated", fetchName)
  }, [])

  const handleLogout = async () => {
    if (loggingOut) return
    setLoggingOut(true)
    await fetch("/api/auth/logout", { method: "POST" })
    toast.success("Signed out")
    router.push("/")
    router.refresh()
  }

  const initials = name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)

  return (
    <header className="sticky top-0 z-40 border-b border-(--border-soft) bg-[var(--bg-alt)]/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo className="h-12 w-auto" />
        </Link>

        {/* Nav with active styling */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                    : "text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface) border border-transparent"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* User + logout */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/dashboard/profile"
            className={cn(
              "flex items-center gap-2 text-sm px-3 py-1.5 rounded-xl transition-all",
              pathname === "/dashboard/profile"
                ? "bg-primary-500/10 border border-primary-500/20"
                : "hover:bg-(--surface) border border-transparent"
            )}
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {initials}
            </div>
            <span className="text-(--text) hidden sm:block max-w-[120px] truncate">{name}</span>
          </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface) transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
            <span className="hidden sm:block">{loggingOut ? "Signing out…" : "Sign Out"}</span>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex items-center gap-1 px-4 pb-3 overflow-x-auto">
        {navLinks.map(({ label, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all",
                active
                  ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                  : "text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface) border border-transparent"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </Link>
          )
        })}
      </div>
    </header>
  )
}
