"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

const contactInfo = [
  { icon: Mail, label: "Email", value: "info@mhwconsultancy.in", href: "mailto:info@mhwconsultancy.in" },
  { icon: Phone, label: "Phone", value: "+91 88026 60308", href: "tel:+918802660308" },
  { icon: MapPin, label: "Address", value: "Kasra no 839, First Floor, Aman Vihar, Kadipur, Delhi", href: "#" },
]

const services = [
  "Accounting Services",
  "NGO Compliance",
  "Tax Advisory",
  "Corporate Advisory",
  "Training / Course",
  "Audit Support",
  "Other",
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed to send message")
      setSubmitted(true)
      toast.success("Message sent! We'll get back to you within 24 hours.")
    } catch {
      toast.error("Failed to send. Please try again or email us directly.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 hero-bg dot-grid overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary-500/20 mb-6">
              <span className="text-xs font-medium text-primary-400 uppercase tracking-wider">Contact Us</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-(--text) mb-6" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              Let's Start a<br />
              <span className="gradient-text">Conversation</span>
            </h1>
            <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto">
              Have a question or need consulting services? We're here to help. Reach out and we'll respond within 24 hours.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </section>

      <section className="section-py">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-(--text) mb-6" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                  Get in Touch
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((info) => {
                    const Icon = info.icon
                    return (
                      <a
                        key={info.label}
                        href={info.href}
                        className="flex items-start gap-4 glass-card rounded-xl p-4 border border-(--border-soft) hover:border-primary-500/20 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 text-primary-400" />
                        </div>
                        <div>
                          <p className="text-xs text-[var(--text-muted)] mb-0.5">{info.label}</p>
                          <p className="text-(--text) font-medium text-sm">{info.value}</p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </motion.div>

              {/* Office hours */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-xl p-6 border border-(--border-soft)"
              >
                <h3 className="text-(--text) font-semibold mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Monday – Friday</span>
                    <span className="text-(--text)">9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Saturday</span>
                    <span className="text-(--text)">10:00 AM – 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Sunday</span>
                    <span className="text-[var(--text-muted)]">Closed</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="glass-card rounded-2xl p-8 border border-(--border-soft)">
                {submitted ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-(--text) mb-3" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                      Message Sent!
                    </h3>
                    <p className="text-[var(--text-muted)]">We'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", service: "", message: "" }) }}
                      className="mt-6 text-sm text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="text-xl font-bold text-(--text) mb-6" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                      Send Us a Message
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-[var(--text-muted)] mb-2">Full Name *</label>
                        <input
                          required name="name" value={form.name} onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl glass border border-(--border) text-(--text) placeholder-[var(--text-muted)] focus:outline-none focus:border-primary-500/40 bg-transparent transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[var(--text-muted)] mb-2">Email Address *</label>
                        <input
                          required type="email" name="email" value={form.email} onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl glass border border-(--border) text-(--text) placeholder-[var(--text-muted)] focus:outline-none focus:border-primary-500/40 bg-transparent transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-[var(--text-muted)] mb-2">Phone Number</label>
                        <input
                          type="tel" name="phone" value={form.phone} onChange={handleChange}
                          placeholder="+91 00000 00000"
                          className="w-full px-4 py-3 rounded-xl glass border border-(--border) text-(--text) placeholder-[var(--text-muted)] focus:outline-none focus:border-primary-500/40 bg-transparent transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[var(--text-muted)] mb-2">Service Interested In</label>
                        <select
                          name="service" value={form.service} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl glass border border-(--border) text-(--text) focus:outline-none focus:border-primary-500/40 bg-[var(--bg-card)] transition-colors text-sm"
                        >
                          <option value="" className="bg-[var(--bg-card)]">Select a service</option>
                          {services.map((s) => (
                            <option key={s} value={s} className="bg-[var(--bg-card)]">{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-[var(--text-muted)] mb-2">Message *</label>
                      <textarea
                        required name="message" value={form.message} onChange={handleChange}
                        rows={5} placeholder="Tell us about your needs..."
                        className="w-full px-4 py-3 rounded-xl glass border border-(--border) text-(--text) placeholder-[var(--text-muted)] focus:outline-none focus:border-primary-500/40 bg-transparent transition-colors text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit" disabled={loading}
                      className="w-full flex items-center justify-center gap-2 shimmer-btn text-white font-semibold px-6 py-4 rounded-xl hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-primary-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
