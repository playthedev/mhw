"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Amit Sharma",
    role: "Executive Director, Green Delhi NGO",
    content: "MHW Consultancy transformed our compliance process completely. Their NGO compliance service saved us from major regulatory issues. Highly professional team.",
    rating: 5,
    avatar: "AS",
    color: "from-blue-500 to-primary-500",
  },
  {
    name: "Priya Singh",
    role: "Finance Manager, Delhi Relief Trust",
    content: "The accounting course was incredibly practical. I was able to implement what I learned immediately. The instructor was knowledgeable and supportive.",
    rating: 5,
    avatar: "PS",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Rohit Verma",
    role: "CEO, DigitalEdge Consulting",
    content: "Their tax advisory service is exceptional. Saved us significant money and ensured full GST and income tax compliance. Strongly recommend.",
    rating: 5,
    avatar: "RV",
    color: "from-green-500 to-teal-500",
  },
  {
    name: "Kavya Gupta",
    role: "Program Officer, Jan Seva Foundation",
    content: "The internship program for our NGO staff was life-changing. They now understand governance and compliance at a professional level.",
    rating: 5,
    avatar: "KG",
    color: "from-orange-500 to-gold-500",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="section-py section-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-(--border) mb-5">
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--text) mb-5" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
            What Our{" "}
            <span className="gradient-text">Clients Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 border border-(--border-soft) relative overflow-hidden"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-(--text)/5" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-gold-400 fill-gold-400" />
                ))}
              </div>

              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">"{t.content}"</p>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-(--text) font-medium text-sm">{t.name}</p>
                  <p className="text-[var(--text-muted)] text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
