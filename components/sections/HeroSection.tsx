"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Play, CheckCircle2, Star } from "lucide-react"

const floatingBadges = [
  { text: "500+ Clients Served", icon: "🏢", delay: 0 },
  { text: "FCRA & NGO Compliance", icon: "✅", delay: 0.3 },
  { text: "Certified Trainers", icon: "🎓", delay: 0.6 },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-bg dot-grid">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/3 left-1/2 w-[400px] h-[400px] rounded-full bg-gold-500/8 blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20 mb-8 max-w-full flex-wrap sm:flex-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <span className="text-sm text-[var(--text-muted)]">Now offering</span>
              <span className="text-sm font-medium text-primary-400">NGO Internship Program 2026 — Delhi</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              <span className="text-(--text)">Expert</span>
              <br />
              <span className="gradient-text">Consulting</span>
              <br />
              <span className="text-(--text)">& Training</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed mb-10 max-w-lg"
            >
              Professional accounting, NGO compliance, and training services. We empower organizations with expert guidance and certified courses designed for real-world impact.
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              {["Certified Professionals", "NGO Specialists", "Online Payments"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-400 flex-shrink-0" />
                  <span className="text-sm text-[var(--text-muted)]">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4"
            >
              <Link
                href="/courses"
                className="group flex items-center justify-center gap-2 shimmer-btn text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105 transition-all duration-200"
              >
                Explore Courses
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="group flex items-center justify-center gap-2 glass glass-card font-semibold px-7 py-3.5 rounded-xl text-(--text) hover:border-primary-500/30 transition-all duration-200"
              >
                <Play className="w-4 h-4 text-primary-400" />
                Our Services
              </Link>
            </motion.div>
          </div>

          {/* Right — visual card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main card */}
            <div className="relative glass-card rounded-3xl p-8 glow-primary">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-[var(--text-muted)] mb-1">Total Enrollments</p>
                  <p className="text-3xl font-bold text-(--text)">2,847</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
              </div>

              {/* Progress bars */}
              <div className="space-y-4 mb-6">
                {[
                  { label: "Accounting Courses", value: 78, color: "bg-primary-500" },
                  { label: "NGO Compliance", value: 92, color: "bg-purple-500" },
                  { label: "Internship Program", value: 65, color: "bg-gold-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-[var(--text-muted)]">{item.label}</span>
                      <span className="text-(--text) font-medium">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-(--surface) rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                        className={`h-full ${item.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 pt-4 border-t border-(--border-soft)">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <span className="text-sm text-(--text) font-medium">4.9/5</span>
                <span className="text-sm text-[var(--text-muted)]">from 340+ reviews</span>
              </div>
            </div>

            {/* Floating badges */}
            {floatingBadges.map((badge, i) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + badge.delay }}
                className={`absolute glass-card rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-lg ${
                  i === 0 ? "-top-4 -left-8" : i === 1 ? "-bottom-4 -left-4" : "-right-8 top-1/3"
                }`}
              >
                <span>{badge.icon}</span>
                <span className="text-xs font-medium text-(--text) whitespace-nowrap">{badge.text}</span>
              </motion.div>
            ))}

            {/* Decorative ring */}
            <div className="absolute -z-10 inset-0 scale-110 rounded-3xl border border-primary-500/10 animate-spin-slow" />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none" />
    </section>
  )
}
