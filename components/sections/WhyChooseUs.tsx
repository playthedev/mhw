"use client"

import { motion } from "framer-motion"
import { Shield, Zap, HeadphonesIcon, Award, Globe, Lock } from "lucide-react"

const reasons = [
  {
    icon: Award,
    title: "Certified Experts",
    description: "Our team holds international certifications in accounting, compliance, and NGO management.",
    color: "text-gold-400",
    bg: "bg-gold-500/10 border-gold-500/20",
  },
  {
    icon: Shield,
    title: "Compliance Guaranteed",
    description: "We ensure 100% compliance with local and international regulatory requirements.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Quick delivery without compromising quality. Most projects completed within agreed timelines.",
    color: "text-primary-400",
    bg: "bg-primary-500/10 border-primary-500/20",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Dedicated support team available around the clock for your queries and urgent needs.",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    icon: Globe,
    title: "Online Access",
    description: "All courses and resources accessible online. Learn and access services from anywhere.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description: "Industry-standard payment security. Your transactions are fully protected and encrypted.",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section-py relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-500/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-(--border) mb-5">
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--text) mb-5" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
            The{" "}
            <span className="gradient-text">MHW</span>
            {" "}Advantage
          </h2>
          <p className="text-[var(--text-muted)] max-w-lg mx-auto text-lg">
            We combine expertise, technology, and dedication to deliver results that exceed expectations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="glass-card rounded-2xl p-6 group border border-(--border-soft) hover:border-(--border)"
              >
                <div className={`w-12 h-12 rounded-xl ${reason.bg} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${reason.color}`} />
                </div>
                <h3 className="text-(--text) font-semibold text-base mb-2" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                  {reason.title}
                </h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
