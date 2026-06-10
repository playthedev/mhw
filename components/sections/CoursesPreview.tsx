"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Clock, Users, Star, Play } from "lucide-react"
import { formatPrice } from "@/lib/utils"

const featuredCourses = [
  {
    id: "1",
    title: "NGO Management & Compliance Fundamentals",
    category: "NGO",
    level: "Beginner",
    duration: "8 weeks",
    students: 342,
    rating: 4.9,
    price: 15000,
    badge: "Best Seller",
    badgeColor: "bg-gold-500/10 text-gold-400 border-gold-500/20",
    gradient: "from-purple-500/20 to-primary-500/10",
  },
  {
    id: "2",
    title: "Accounting Basics for Non-Profits",
    category: "Accounting",
    level: "Beginner",
    duration: "6 weeks",
    students: 218,
    rating: 4.8,
    price: 12000,
    badge: "Popular",
    badgeColor: "bg-primary-500/10 text-primary-400 border-primary-500/20",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    id: "3",
    title: "Advanced Tax Compliance & Filing",
    category: "Tax",
    level: "Intermediate",
    duration: "10 weeks",
    students: 156,
    rating: 4.7,
    price: 20000,
    badge: "New",
    badgeColor: "bg-green-500/10 text-green-400 border-green-500/20",
    gradient: "from-green-500/20 to-teal-500/10",
  },
]

export default function CoursesPreview() {
  return (
    <section className="section-py section-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-gold-500/20 mb-5">
              <span className="text-xs font-medium text-gold-400 uppercase tracking-wider">Courses & Training</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--text)" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              Learn From{" "}
              <span className="gradient-text">Experts</span>
            </h2>
          </div>
          <Link
            href="/courses"
            className="group inline-flex items-center gap-2 text-primary-400 font-medium hover:text-primary-300 transition-colors flex-shrink-0"
          >
            All courses
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Courses grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden border border-(--border-soft) group hover:border-primary-500/20 transition-all duration-300"
            >
              {/* Course thumbnail placeholder */}
              <div className={`relative h-48 bg-gradient-to-br ${course.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="w-16 h-16 rounded-2xl bg-(--surface-hover) flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Play className="w-8 h-8 text-(--text) ml-1" />
                </div>
                {/* Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border ${course.badgeColor}`}>
                  {course.badge}
                </div>
                {/* Level */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/30 text-xs font-medium text-(--text)/80 backdrop-blur-sm">
                  {course.level}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-primary-400 bg-primary-500/10 px-2.5 py-1 rounded-full">
                    {course.category}
                  </span>
                </div>

                <h3 className="text-(--text) font-semibold text-base leading-tight mb-4 group-hover:text-primary-300 transition-colors" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                  {course.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-5">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                    <span className="text-(--text)">{course.rating}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-(--border-soft)">
                  <span className="text-xl font-bold text-(--text)">
                    {formatPrice(course.price)}
                  </span>
                  <Link
                    href={`/courses`}
                    className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1 group/btn"
                  >
                    Enroll
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
