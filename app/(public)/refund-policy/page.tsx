"use client"

import { motion } from "framer-motion"
import { RotateCcw, CheckCircle, XCircle, Clock } from "lucide-react"
import Link from "next/link"

const highlights = [
  {
    icon: CheckCircle,
    title: "Full Refund",
    description: "Cancellation within 24 hours of enrolment (before any course content is accessed).",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    icon: Clock,
    title: "Partial Refund",
    description: "Cancellation within 3 days of enrolment with less than 20% of course content accessed.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    icon: XCircle,
    title: "No Refund",
    description: "Cancellation after 3 days or after more than 20% of course content has been accessed.",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
  },
]

const sections = [
  {
    title: "Online Courses",
    content: [
      "Full refund if you cancel within 24 hours of purchase and have not accessed any course content.",
      "50% refund if you cancel within 3 days of purchase and have accessed less than 20% of course content.",
      "No refund is available after 3 days of purchase or if more than 20% of the course content has been accessed.",
      "To request a refund, email info@mhwconsultancy.in with your order ID and reason for cancellation.",
      "Approved refunds are processed within 7–10 business days to the original payment method.",
    ],
  },
  {
    title: "Consulting & Advisory Services",
    content: [
      "Consulting engagements are confirmed upon signing of an engagement letter and receipt of payment.",
      "You may cancel a consulting engagement within 48 hours of payment for a full refund, provided no work has commenced.",
      "If work has commenced, a pro-rated refund will be issued based on the proportion of work remaining.",
      "No refund is issued once a deliverable (report, filing, document) has been submitted to the client.",
      "Cancellation requests must be submitted in writing to info@mhwconsultancy.in.",
    ],
  },
  {
    title: "Internship Program",
    content: [
      "Internship programme fees are non-refundable once the programme has commenced.",
      "If you withdraw before the programme start date, a 50% refund will be issued provided you notify us at least 7 days in advance.",
      "No refund is issued for withdrawals made within 7 days of the programme start date.",
    ],
  },
  {
    title: "Exceptional Circumstances",
    content: [
      "In cases of medical emergency or bereavement, please contact us with supporting documentation. We will review each case individually and may offer a credit, deferral, or partial refund at our discretion.",
      "If MHW Consultancy cancels or discontinues a service or course, affected clients will receive a full refund for the unused portion.",
    ],
  },
  {
    title: "How to Cancel",
    content: [
      "Send an email to info@mhwconsultancy.in with the subject line 'Cancellation Request'.",
      "Include your full name, registered email address, order/invoice number, and reason for cancellation.",
      "We will acknowledge your request within 1 business day and confirm eligibility within 3 business days.",
      "Refunds, once approved, are credited within 7–10 business days.",
    ],
  },
  {
    title: "Non-Refundable Items",
    content: [
      "Government filing fees, stamp duty, or third-party charges paid on your behalf are non-refundable.",
      "Customised documents, filings, or reports prepared specifically for your organisation are non-refundable.",
      "Promotional or discounted purchases may have different refund terms as specified at the time of purchase.",
    ],
  },
]

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 hero-bg dot-grid overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary-500/20 mb-6">
              <RotateCcw className="w-3.5 h-3.5 text-primary-400" />
              <span className="text-xs font-medium text-primary-400 uppercase tracking-wider">Legal</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-(--text) mb-4" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              Refund &amp; Cancellation <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-[var(--text-muted)] text-sm">Last updated: June 2026</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </section>

      {/* Content */}
      <section className="section-py">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[var(--text-muted)] leading-relaxed mb-12 text-sm"
          >
            At MHW Consultancy, we strive to deliver high-quality services and courses. If you are not satisfied, please review our refund and cancellation policy below. We aim to be fair and transparent in all cases.
          </motion.p>

          {/* Quick summary cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {highlights.map((h, i) => {
              const Icon = h.icon
              return (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className={`glass-card rounded-2xl p-6 border ${h.bg}`}
                >
                  <Icon className={`w-6 h-6 ${h.color} mb-4`} />
                  <h3 className="text-(--text) font-semibold mb-2" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{h.title}</h3>
                  <p className="text-[var(--text-muted)] text-xs leading-relaxed">{h.description}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-8 border border-(--border-soft)"
              >
                <h2
                  className="text-lg font-bold text-(--text) mb-5"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {i + 1}. {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.content.map((item, j) => (
                    <li key={j} className="flex gap-3 text-sm text-[var(--text-muted)] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 glass-card rounded-2xl p-8 border border-primary-500/20"
          >
            <h2 className="text-lg font-bold text-(--text) mb-3" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              Need Help?
            </h2>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">
              For any refund or cancellation queries, please reach out to our support team:
            </p>
            <div className="space-y-1 text-sm text-[var(--text-muted)]">
              <p>Email: <a href="mailto:info@mhwconsultancy.in" className="text-primary-400 hover:underline">info@mhwconsultancy.in</a></p>
              <p>Phone: <a href="tel:+917065127127" className="text-primary-400 hover:underline">+91 70651 27127</a></p>
              <p className="pt-1 text-xs">Support hours: Monday – Saturday, 10 AM – 6 PM IST</p>
            </div>
          </motion.div>

          <div className="mt-8 flex gap-4 text-sm text-[var(--text-muted)]">
            <Link href="/privacy-policy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-primary-400 transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
