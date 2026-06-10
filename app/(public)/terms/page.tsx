"use client"

import { motion } from "framer-motion"
import { FileText } from "lucide-react"
import Link from "next/link"

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      "By accessing or using the MHW Consultancy website (mhwconsultancy.in) or any of our services, you agree to be bound by these Terms & Conditions.",
      "If you do not agree with any part of these terms, please discontinue use of our website and services immediately.",
      "We reserve the right to update these terms at any time. Continued use of our services constitutes acceptance of the revised terms.",
    ],
  },
  {
    title: "Services",
    content: [
      "MHW Consultancy Pvt. Ltd. provides consulting, compliance, accounting, tax advisory, and professional training services.",
      "Service descriptions on this website are for informational purposes only and do not constitute a binding contract until a formal engagement letter or invoice is issued.",
      "We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.",
    ],
  },
  {
    title: "Online Courses & Enrolments",
    content: [
      "Course content, schedules, and instructors are subject to change without prior notice.",
      "Course access is granted to the registered individual only and may not be shared, transferred, or resold.",
      "Certificates of completion are issued only upon satisfying all course requirements as specified in the respective course.",
      "We make no guarantees regarding employment outcomes or examination results following completion of any course.",
    ],
  },
  {
    title: "Payments & Billing",
    content: [
      "All fees are listed in Indian Rupees (INR) unless otherwise stated and are inclusive of applicable taxes.",
      "Payments are processed securely through Stripe. By making a payment, you agree to Stripe's Terms of Service.",
      "We reserve the right to change pricing at any time. Price changes will not affect already-confirmed enrolments.",
      "In case of payment failure or dispute, please contact us at info@mhwconsultancy.in within 7 days.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "All content on this website — including text, graphics, logos, course materials, and software — is the property of MHW Consultancy Pvt. Ltd. and is protected by applicable intellectual property laws.",
      "You may not reproduce, distribute, modify, or create derivative works without our prior written consent.",
      "You are granted a limited, non-exclusive, non-transferable licence to access and use the website for personal, non-commercial purposes.",
    ],
  },
  {
    title: "User Conduct",
    content: [
      "You agree not to use the website for any unlawful purpose or in a way that violates these terms.",
      "You must not attempt to gain unauthorised access to any part of the website, server, or database.",
      "You must not upload or transmit any content that is harmful, offensive, defamatory, or infringes any third-party rights.",
      "We reserve the right to terminate your access if you breach any of these conduct guidelines.",
    ],
  },
  {
    title: "Disclaimer of Warranties",
    content: [
      "Our services and website are provided on an 'as is' and 'as available' basis without warranties of any kind, either express or implied.",
      "We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.",
      "Information provided on this website is for general informational purposes and does not constitute professional legal, financial, or tax advice.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      "To the fullest extent permitted by law, MHW Consultancy Pvt. Ltd. shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.",
      "Our total liability for any claim arising out of or relating to these terms shall not exceed the amount paid by you to us in the three months preceding the claim.",
    ],
  },
  {
    title: "Governing Law",
    content: [
      "These Terms & Conditions are governed by and construed in accordance with the laws of India.",
      "Any dispute arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Delhi, India.",
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 hero-bg dot-grid overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary-500/20 mb-6">
              <FileText className="w-3.5 h-3.5 text-primary-400" />
              <span className="text-xs font-medium text-primary-400 uppercase tracking-wider">Legal</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-(--text) mb-4" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              Terms &amp; <span className="gradient-text">Conditions</span>
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
            Please read these Terms &amp; Conditions carefully before using the services offered by MHW Consultancy Pvt. Ltd. These terms govern your access to and use of our website and services.
          </motion.p>

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
              Questions?
            </h2>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">
              If you have any questions about these Terms &amp; Conditions, please contact us:
            </p>
            <div className="space-y-1 text-sm text-[var(--text-muted)]">
              <p>MHW Consultancy Pvt. Ltd.</p>
              <p>Kasra no 839, First Floor, Aman Vihar, Kadipur, Delhi</p>
              <p>Email: <a href="mailto:info@mhwconsultancy.in" className="text-primary-400 hover:underline">info@mhwconsultancy.in</a></p>
              <p>Phone: <a href="tel:+918802660308" className="text-primary-400 hover:underline">+91 88026 60308</a></p>
            </div>
          </motion.div>

          <div className="mt-8 flex gap-4 text-sm text-[var(--text-muted)]">
            <Link href="/privacy-policy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/refund-policy" className="hover:text-primary-400 transition-colors">Refund &amp; Cancellation Policy</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
