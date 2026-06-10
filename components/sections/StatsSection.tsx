"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const stats = [
  { value: 500, suffix: "+", label: "Clients Served", icon: "🏢" },
  { value: 50, suffix: "+", label: "Courses Available", icon: "📚" },
  { value: 2847, suffix: "", label: "Students Enrolled", icon: "🎓" },
  { value: 98, suffix: "%", label: "Client Satisfaction", icon: "⭐" },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const step = value / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, value)
      setCount(Math.floor(current))
      if (current >= value) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="section-bg-alt section-py border-y border-(--border-soft)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text-blue mb-2" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
