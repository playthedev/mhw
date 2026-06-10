"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import Link from "next/link"

const sections = [
  {
    title: "Information We Collect",
    content: [
      "Personal identification information (name, email address, phone number) when you fill out contact or enrollment forms.",
      "Payment information processed securely through our third-party payment provider (Stripe). We do not store your card details.",
      "Usage data such as pages visited, time spent on the site, and browser/device type, collected via cookies and analytics tools.",
      "Communications you send us via email or our contact form.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "To provide, operate, and improve our consulting services and online courses.",
      "To process transactions and send related information including confirmations and invoices.",
      "To send administrative information such as updates about courses or services you have enrolled in.",
      "To respond to your inquiries and provide customer support.",
      "To send promotional communications (only with your explicit consent — you may opt out at any time).",
      "To comply with legal obligations and enforce our policies.",
    ],
  },
  {
    title: "Sharing Your Information",
    content: [
      "We do not sell, trade, or rent your personal information to third parties.",
      "We may share data with trusted service providers (e.g., Stripe for payments, email delivery providers) solely to operate our services, under strict confidentiality obligations.",
      "We may disclose information if required by law, court order, or government authority.",
      "In the event of a merger or acquisition, user data may be transferred to the acquiring entity with prior notice.",
    ],
  },
  {
    title: "Cookies & Tracking",
    content: [
      "We use cookies to maintain your session, remember preferences, and analyse site traffic.",
      "You can control or disable cookies through your browser settings. Note that some features may not function properly without cookies.",
      "We use Google Analytics (or equivalent) to understand aggregate usage patterns. This data is anonymised and not linked to your identity.",
    ],
  },
  {
    title: "Data Security",
    content: [
      "We implement industry-standard security measures including HTTPS encryption, secure servers, and access controls.",
      "Despite our efforts, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.",
      "We retain your personal data only as long as necessary to fulfil the purposes outlined in this policy or as required by law.",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "You have the right to access, correct, or delete the personal data we hold about you.",
      "You may withdraw consent for marketing communications at any time by clicking 'Unsubscribe' or contacting us directly.",
      "To exercise any of these rights, please email us at info@mhwconsultancy.in.",
    ],
  },
  {
    title: "Children's Privacy",
    content: [
      "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors.",
      "If you believe we have inadvertently collected information from a minor, please contact us immediately.",
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy periodically. When we do, we will revise the 'Last Updated' date at the top of this page.",
      "Continued use of our website after changes constitutes your acceptance of the revised policy.",
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 hero-bg dot-grid overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary-500/20 mb-6">
              <Shield className="w-3.5 h-3.5 text-primary-400" />
              <span className="text-xs font-medium text-primary-400 uppercase tracking-wider">Legal</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-(--text) mb-4" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              Privacy <span className="gradient-text">Policy</span>
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
            MHW Consultancy Pvt. Ltd. (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit{" "}
            <span className="text-primary-400">mhwconsultancy.in</span> or use our services.
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
              Contact Us
            </h2>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please reach out:
            </p>
            <div className="space-y-1 text-sm text-[var(--text-muted)]">
              <p>MHW Consultancy Pvt. Ltd.</p>
              <p>Kasra no 839, First Floor, Aman Vihar, Kadipur, Delhi</p>
              <p>Email: <a href="mailto:info@mhwconsultancy.in" className="text-primary-400 hover:underline">info@mhwconsultancy.in</a></p>
              <p>Phone: <a href="tel:+918802660308" className="text-primary-400 hover:underline">+91 88026 60308</a></p>
            </div>
          </motion.div>

          <div className="mt-8 flex gap-4 text-sm text-[var(--text-muted)]">
            <Link href="/terms" className="hover:text-primary-400 transition-colors">Terms &amp; Conditions</Link>
            <span>·</span>
            <Link href="/refund-policy" className="hover:text-primary-400 transition-colors">Refund &amp; Cancellation Policy</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
