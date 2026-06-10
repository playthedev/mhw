"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard, Users, CreditCard, MessageSquare,
  BookOpen, Settings, ArrowLeft, Briefcase, LogOut, Receipt, Menu, X, Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import ThemeToggle from "@/components/theme/ThemeToggle"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Enrollments", href: "/admin/enrollments", icon: Users },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Transactions", href: "/admin/transactions", icon: Receipt },
  { label: "Contact Inbox", href: "/admin/contacts", icon: MessageSquare },
  { label: "Courses", href: "/admin/courses", icon: BookOpen },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  const handleLogout = async () => {
    if (loggingOut) return
    setLoggingOut(true)
    await fetch("/api/auth/logout", { method: "POST" })
    toast.success("Signed out")
    router.push("/login")
    router.refresh()
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 bg-[var(--bg-alt)] border-b border-(--border-soft)">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
            <Briefcase className="w-4 h-4 text-(--text)" />
          </div>
          <span className="text-(--text) font-bold text-sm" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>Admin Panel</span>
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface) transition-all"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-[var(--bg-alt)] border-r border-(--border-soft) flex flex-col z-50 transition-transform duration-300",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-(--border-soft) flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <Briefcase className="w-5 h-5 text-(--text)" />
            </div>
            <div>
              <div className="text-(--text) font-bold text-sm" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>MHW Consultancy</div>
              <div className="text-[var(--text-muted)] text-xs">Admin Panel</div>
            </div>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface) transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                    : "text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface)"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-(--border-soft) space-y-1">
          <div className="flex items-center justify-between px-4 py-1">
            <span className="text-sm text-[var(--text-muted)]">Theme</span>
            <ThemeToggle />
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface) transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
            {loggingOut ? "Signing out…" : "Sign Out"}
          </button>
        </div>
      </aside>
    </>
  )
}
