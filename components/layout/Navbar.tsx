"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, LayoutDashboard, LogOut, User, Loader2, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import ThemeToggle from "@/components/theme/ThemeToggle"
import JoinUsModal, { type JoinUsCategory } from "@/components/ui/JoinUsModal"
import Logo from "@/components/ui/Logo"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Courses", href: "/courses" },
  { label: "Study", href: "/study" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const serviceNavItems = [
  { label: "All Services", href: "/services" },
  { label: "Registration Service", href: "/services#registration" },
]

type JoinUsItem =
  | { label: string; type: "category"; category: JoinUsCategory }
  | { label: string; type: "link"; href: string }

const joinUsItems: JoinUsItem[] = [
  { label: "Professional", type: "category", category: "professional" },
  { label: "Internship", type: "category", category: "internship" },
  { label: "Career", type: "category", category: "career" },
  { label: "For Professional Services", type: "link", href: "/services" },
  { label: "For Trainings", type: "link", href: "/courses" },
]

interface NavUser {
  name: string
  email: string
  role: "user" | "admin"
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<NavUser | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [joinUsOpen, setJoinUsOpen] = useState(false)
  const [joinUsMobileOpen, setJoinUsMobileOpen] = useState(false)
  const [joinUsCategory, setJoinUsCategory] = useState<JoinUsCategory | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setUserMenuOpen(false)
    setJoinUsOpen(false)
    setJoinUsMobileOpen(false)
  }, [pathname])

  const handleJoinUsItem = (item: JoinUsItem) => {
    setJoinUsOpen(false)
    setJoinUsMobileOpen(false)
    if (item.type === "category") {
      setMobileOpen(false)
      setJoinUsCategory(item.category)
    } else {
      router.push(item.href)
    }
  }

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => { if (data.user) setUser(data.user) })
      .catch(() => {})
  }, [pathname])

  const handleLogout = async () => {
    if (loggingOut) return
    setLoggingOut(true)
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    toast.success("Signed out")
    router.push("/")
    router.refresh()
  }

  return (
    <>
      <motion.header
        // Render visible by default so the navbar shows even before hydration
        // (a hidden Framer `initial` here left the header off-screen on slow
        // mobile loads). The slide-in is applied as a CSS keyframe instead.
        initial={false}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-slide-down",
          scrolled
            ? "bg-[var(--bg)]/90 backdrop-blur-xl border-b border-(--border-soft) shadow-2xl shadow-black/20"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Logo className="h-14 w-auto" priority />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                link.label === "Services" ? (
                  <div key={link.href} className="relative">
                    <button
                      type="button"
                      onClick={() => setServicesOpen((o) => !o)}
                      className={cn(
                        "relative flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                        pathname === link.href || servicesOpen ? "text-(--text)" : "text-[var(--text-muted)] hover:text-(--text)"
                      )}
                    >
                      {pathname === link.href && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-0 bg-primary-500/10 rounded-lg border border-(--border)"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                      <ChevronDown className={cn("relative z-10 w-3.5 h-3.5 transition-transform", servicesOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setServicesOpen(false)} />
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 top-full mt-2 w-56 glass-card rounded-xl border border-(--border) overflow-hidden shadow-xl shadow-black/40 py-1 z-50"
                          >
                            {serviceNavItems.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setServicesOpen(false)}
                                className="block px-4 py-2.5 text-sm text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface) transition-all"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      pathname === link.href ? "text-(--text)" : "text-[var(--text-muted)] hover:text-(--text)"
                    )}
                  >
                    {pathname === link.href && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-primary-500/10 rounded-lg border border-(--border)"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                )
              ))}

              {/* Join Us dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setJoinUsOpen((o) => !o)}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    joinUsOpen ? "text-(--text)" : "text-[var(--text-muted)] hover:text-(--text)"
                  )}
                >
                  Join Us
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", joinUsOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {joinUsOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setJoinUsOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 glass-card rounded-xl border border-(--border) overflow-hidden shadow-xl shadow-black/40 py-1 z-50"
                      >
                        {joinUsItems.map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => handleJoinUsItem(item)}
                            className="w-full text-left px-4 py-2.5 text-sm text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface) transition-all"
                          >
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* CTA / Auth */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl glass border border-(--border) hover:border-(--border-strong) transition-all text-sm"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-primary-400" />
                    </div>
                    <span className="text-(--text) max-w-[120px] truncate">{user.name}</span>
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-44 glass-card rounded-xl border border-(--border) overflow-hidden shadow-xl shadow-black/40 py-1"
                      >
                        <Link
                          href={user.role === "admin" ? "/admin" : "/dashboard"}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface) transition-all"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          {user.role === "admin" ? "Admin Panel" : "My Dashboard"}
                        </Link>
                        <div className="border-t border-(--border-soft) mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            disabled={loggingOut}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {loggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
                            {loggingOut ? "Signing out…" : "Sign Out"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-[var(--text-muted)] hover:text-(--text) transition-colors px-4 py-2">
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="shimmer-btn text-sm font-semibold text-white px-5 py-2.5 rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105 transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <div className="lg:hidden flex items-center gap-1">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface) transition-all"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden"
          >
            <div className="mx-4 mt-2 rounded-2xl bg-[var(--bg)]/95 backdrop-blur-xl border border-(--border) overflow-hidden shadow-2xl shadow-black/40">
              <div className="p-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-sm font-medium transition-all",
                        pathname === link.href
                          ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                          : "text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface)"
                      )}
                    >
                      {link.label}
                    </Link>
                    {link.label === "Services" && (
                      <div className="mt-1 pl-4">
                        <Link
                          href="/services#registration"
                          className="block px-4 py-2.5 rounded-xl text-sm text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface) transition-all"
                        >
                          Registration Service
                        </Link>
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Join Us */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.05 }}>
                  <button
                    type="button"
                    onClick={() => setJoinUsMobileOpen((o) => !o)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface) transition-all"
                  >
                    Join Us
                    <ChevronDown className={cn("w-4 h-4 transition-transform", joinUsMobileOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {joinUsMobileOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-4"
                      >
                        {joinUsItems.map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => handleJoinUsItem(item)}
                            className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface) transition-all"
                          >
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <div className="pt-3 border-t border-(--border-soft) flex flex-col gap-2">
                  {user ? (
                    <>
                      <Link
                        href={user.role === "admin" ? "/admin" : "/dashboard"}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface) transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        {user.role === "admin" ? "Admin Panel" : "My Dashboard"}
                      </Link>
                      <button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
                        {loggingOut ? "Signing out…" : "Sign Out"}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="block px-4 py-3 rounded-xl text-sm font-medium text-[var(--text-muted)] hover:text-(--text) hover:bg-(--surface) transition-all">
                        Sign In
                      </Link>
                      <Link href="/register" className="block shimmer-btn text-center text-sm font-semibold text-white px-4 py-3 rounded-xl">
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <JoinUsModal category={joinUsCategory} onClose={() => setJoinUsCategory(null)} />
    </>
  )
}
