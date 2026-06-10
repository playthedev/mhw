"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Calculator, FileCheck, Building2, BookOpen, TrendingUp, Users } from "lucide-react"

const services = [
  {
    icon: Calculator,
    title: "Accounting Services",
    description: "Comprehensive bookkeeping, financial statements, and accounting advisory for businesses of all sizes.",
    color: "from-blue-500/10 to-primary-500/5",
    iconColor: "text-blue-400",
    borderColor: "hover:border-blue-500/30",
  },
  {
    icon: FileCheck,
    title: "NGO Compliance",
    description: "Complete compliance management for NGOs — registration, reporting, audits, and regulatory filings.",
    color: "from-purple-500/10 to-primary-500/5",
    iconColor: "text-purple-400",
    borderColor: "hover:border-purple-500/30",
  },
  {
    icon: Building2,
    title: "Corporate Advisory",
    description: "Strategic business advisory, company formation, and corporate governance consulting.",
    color: "from-green-500/10 to-teal-500/5",
    iconColor: "text-green-400",
    borderColor: "hover:border-green-500/30",
  },
  {
    icon: TrendingUp,
    title: "Tax Advisory",
    description: "Tax planning, filing, and compliance services to minimize liability and maximize efficiency.",
    color: "from-orange-500/10 to-yellow-500/5",
    iconColor: "text-orange-400",
    borderColor: "hover:border-orange-500/30",
  },
  {
    icon: Users,
    title: "NGO Training",
    description: "Specialized training programs for NGO staff on governance, reporting, and compliance.",
    color: "from-pink-500/10 to-rose-500/5",
    iconColor: "text-pink-400",
    borderColor: "hover:border-pink-500/30",
  },
  {
    icon: BookOpen,
    title: "Audit Support",
    description: "Pre-audit preparation, internal audit support, and statutory audit assistance services.",
    color: "from-cyan-500/10 to-sky-500/5",
    iconColor: "text-cyan-400",
    borderColor: "hover:border-cyan-500/30",
  },
]

export default function ServicesPreview() {
  return (
    <section className="section-py">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary-500/20 mb-5">
            <span className="text-xs font-medium text-primary-400 uppercase tracking-wider">Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--text) mb-5" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
            Everything Your Organization{" "}
            <span className="gradient-text">Needs</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto text-lg">
            From accounting to NGO compliance — professional services tailored for your success.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`glass-card rounded-2xl p-6 group cursor-pointer border border-(--border-soft) ${service.borderColor} transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} border border-(--border-soft) flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${service.iconColor}`} />
                </div>
                <h3 className="text-(--text) font-semibold text-lg mb-3" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                  {service.title}
                </h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-primary-400 font-medium hover:text-primary-300 transition-colors"
          >
            View all services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
