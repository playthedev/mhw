"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"

export default function CTASection() {
  return (
    <section className="section-py">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-purple-600" />
          <div className="absolute inset-0 dot-grid opacity-20" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-(--surface-hover) rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl" />

          <div className="relative px-6 sm:px-8 py-16 md:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--text) mb-5" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                Ready to Transform Your Organization?
              </h2>
              <p className="text-(--text)/70 text-lg mb-10 max-w-xl mx-auto">
                Join 500+ organizations that trust MHW Consultancy for their compliance, accounting, and training needs.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-2 bg-white text-primary-600 font-semibold px-7 py-3.5 rounded-xl hover:bg-white/90 hover:scale-105 transition-all duration-200 shadow-lg shadow-black/20"
                >
                  <Phone className="w-4 h-4" />
                  Get Free Consultation
                </Link>
                <Link
                  href="/courses"
                  className="group flex items-center justify-center gap-2 bg-(--surface-hover) border border-(--border-strong) text-(--text) font-semibold px-7 py-3.5 rounded-xl hover:bg-(--surface-strong) hover:scale-105 transition-all duration-200"
                >
                  Browse Courses
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
