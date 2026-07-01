"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  Calculator, FileCheck, Building2, TrendingUp, Users, BookOpen, ClipboardList,
  CheckCircle2, ArrowRight, Phone, X, Send, Loader2, Landmark, BadgeCheck,
  ShieldCheck, RefreshCw, Handshake, IdCard, Hash, FileText
} from "lucide-react"
import { toast } from "sonner"

const services = [
  {
    id: "accounting",
    icon: Calculator,
    title: "Accounting Services",
    tagline: "Complete Financial Management",
    description: "We provide comprehensive accounting solutions tailored for businesses, NGOs, and organizations of all sizes. From day-to-day bookkeeping to full financial reporting.",
    features: [
      "Monthly bookkeeping & ledger management",
      "Financial statements preparation",
      "Bank reconciliation",
      "Accounts payable & receivable",
      "Payroll management",
      "Financial analysis & reporting",
    ],
    color: "from-blue-500/20 to-primary-500/10",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-400",
    accent: "border-blue-500/30",
    formService: "Accounting Services",
  },
  {
    id: "ngo",
    icon: FileCheck,
    title: "NGO Compliance",
    tagline: "Stay Compliant, Stay Funded",
    description: "Specialized compliance services for NGOs, foundations, and non-profit organizations. We navigate complex regulatory requirements so you can focus on your mission.",
    features: [
      "NGO registration & licensing",
      "Annual compliance filing",
      "Donor reporting & audit support",
      "MCA & Income Tax compliance",
      "Foreign funding compliance (FCRA)",
      "Governance policy development",
    ],
    color: "from-purple-500/20 to-primary-500/10",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    iconColor: "text-purple-400",
    accent: "border-purple-500/30",
    formService: "NGO Compliance",
  },
  {
    id: "corporate",
    icon: Building2,
    title: "Corporate Advisory",
    tagline: "Strategic Business Guidance",
    description: "Expert corporate advisory services for startups, SMEs, and established businesses. We help you make informed decisions and structure your business for success.",
    features: [
      "Company registration & incorporation",
      "Business structure advisory",
      "Corporate governance framework",
      "Shareholder agreements",
      "Merger & acquisition support",
      "Regulatory compliance",
    ],
    color: "from-green-500/20 to-teal-500/10",
    iconBg: "bg-green-500/10 border-green-500/20",
    iconColor: "text-green-400",
    accent: "border-green-500/30",
    formService: "Corporate Advisory",
  },
  {
    id: "tax",
    icon: TrendingUp,
    title: "Tax Advisory",
    tagline: "Maximize Savings, Minimize Risk",
    description: "Comprehensive tax planning and compliance services. We help you understand your tax obligations and optimize your tax position within legal boundaries.",
    features: [
      "Income tax filing & planning",
      "GSTR-1, GSTR-3B & Nil return filing",
      "QRMP scheme compliance",
      "Input Tax Credit (ITC) reconciliation",
      "GST health check & compliance review",
      "GST notice handling & reply preparation",
      "Annual Return (GSTR-9) filing",
      "E-commerce GST compliance",
      "Vendor and ITC verification",
      "Tax audit representation",
      "Income Tax notices handling",
    ],
    color: "from-orange-500/20 to-yellow-500/10",
    iconBg: "bg-orange-500/10 border-orange-500/20",
    iconColor: "text-orange-400",
    accent: "border-orange-500/30",
    formService: "Tax Advisory",
  },
  {
    id: "training",
    icon: Users,
    title: "NGO Training",
    tagline: "Build Capacity, Drive Impact",
    description: "Specialized training programs designed for NGO professionals. Enhance your team's skills in governance, financial management, and compliance.",
    features: [
      "Governance & accountability training",
      "Financial management for NGOs",
      "Compliance & regulatory training",
      "Grant writing workshops",
      "M&E (Monitoring & Evaluation)",
      "Leadership development",
    ],
    color: "from-pink-500/20 to-rose-500/10",
    iconBg: "bg-pink-500/10 border-pink-500/20",
    iconColor: "text-pink-400",
    accent: "border-pink-500/30",
    formService: "Training / Course",
  },
  {
    id: "audit",
    icon: BookOpen,
    title: "Audit Support",
    tagline: "Prepared, Protected, Compliant",
    description: "Comprehensive audit support services to ensure your organization is audit-ready at all times. We prepare you for statutory, donor, and internal audits.",
    features: [
      "Pre-audit preparation",
      "Internal audit services",
      "Statutory audit coordination",
      "Donor audit support",
      "Audit findings remediation",
      "Internal controls assessment",
    ],
    color: "from-cyan-500/20 to-sky-500/10",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    iconColor: "text-cyan-400",
    accent: "border-cyan-500/30",
    formService: "Audit Support",
  },
  {
    id: "registration",
    icon: ClipboardList,
    title: "Registration Services",
    tagline: "End-to-End Registration Support",
    description: "From GST and MSME registration to NGO Darpan, FCRA, and statutory registrations under the Income Tax Act — we handle the paperwork so you can focus on running your organization.",
    features: [
      "GST Registration",
      "NGO Darpan Registration",
      "MSME Registration",
      "Registration of NGO/Social Enterprise (₹10,000+)",
      "FCRA Registration (₹25,000+)",
      "Registration U/S 12AA (₹5,000+)",
      "Registration of 80G(5) (₹5,000+)",
      "Registration of Society",
      "Registration Section-8 Company",
      "FCRA Compliance Services (₹10,000+)",
      "FCRA Renewal & FCRA Return Filing",
      "FCRA Prior Permission",
      "PAN Card",
      "TAN Number",
    ],
    color: "from-violet-500/20 to-indigo-500/10",
    iconBg: "bg-violet-500/10 border-violet-500/20",
    iconColor: "text-violet-400",
    accent: "border-violet-500/30",
    formService: "Registration Services",
  },
]

const serviceOptions = [
  "Accounting Services",
  "NGO Compliance",
  "Tax Advisory",
  "Corporate Advisory",
  "Training / Course",
  "Audit Support",
  "Registration Services",
  "GST Registration",
  "NGO Darpan Registration",
  "MSME Registration",
  "Registration of NGO/Social Enterprise",
  "FCRA Registration",
  "Registration U/S 12AA",
  "Registration of 80G(5)",
  "Registration of Society",
  "Registration Section-8 Company",
  "FCRA Compliance Services",
  "FCRA Renewal & FCRA Return Filing",
  "FCRA Prior Permission",
  "PAN Card",
  "TAN Number",
  "Other",
]

const registrationCategories = [
  {
    title: "Basic Registrations",
    summary: "Common starting registrations for businesses, NGOs, and social enterprises.",
    items: [
      {
        title: "GST Registration",
        badge: "Contact Us",
        description: "GST registration is mandatory for eligible businesses and enables lawful tax collection and input tax credit benefits.",
        icon: BadgeCheck,
        color: "text-violet-400",
        panel: "border-violet-500/20 bg-violet-500/10",
      },
      {
        title: "NGO Darpan Registration",
        badge: "Contact Us",
        description: "NGO Darpan registration is mandatory for eligible NGO/Trust/Society and Section 8 company. It enables access to government grants, schemes, and partnerships.",
        icon: Landmark,
        color: "text-teal-400",
        panel: "border-teal-500/20 bg-teal-500/10",
      },
      {
        title: "MSME Registration",
        badge: "Contact Us",
        description: "MSME registration is mandatory for eligible businesses/NGOs.",
        icon: Building2,
        color: "text-amber-400",
        panel: "border-amber-500/20 bg-amber-500/10",
      },
    ],
  },
  {
    title: "Registration & Procurement Services",
    summary: "Entity setup, exemption registration, and donor-facing statutory approvals.",
    items: [
      {
        title: "Registration of NGO/Social Enterprise",
        badge: "INR 10000+",
        description: "Start your social venture with us for growing faster.",
        icon: Handshake,
        color: "text-cyan-400",
        panel: "border-cyan-500/20 bg-cyan-500/10",
      },
      {
        title: "FCRA Registration",
        badge: "INR 25000+",
        description: "Open up window for foreign funding.",
        icon: ShieldCheck,
        color: "text-sky-400",
        panel: "border-sky-500/20 bg-sky-500/10",
      },
      {
        title: "Registration U/S 12AA",
        badge: "INR 5000+",
        description: "Statutory requirement. It is compulsory registration for all non-profits.",
        icon: FileText,
        color: "text-rose-400",
        panel: "border-rose-500/20 bg-rose-500/10",
      },
      {
        title: "Registration of 80G(5)",
        badge: "INR 5000+",
        description: "Give tax benefits to your loved donors and increase your funding flow.",
        icon: BadgeCheck,
        color: "text-yellow-400",
        panel: "border-yellow-500/20 bg-yellow-500/10",
      },
      {
        title: "Registration of Society",
        badge: "Contact Us",
        description: "Start empowering community through registering society.",
        icon: Users,
        color: "text-green-400",
        panel: "border-green-500/20 bg-green-500/10",
      },
      {
        title: "Registration Section-8 Company",
        badge: "Contact Us",
        description: "Get registered within 30 days and start working with our expert advise.",
        icon: Building2,
        color: "text-slate-300",
        panel: "border-slate-500/20 bg-slate-500/10",
      },
    ],
  },
  {
    title: "FCRA Related Services",
    summary: "Foreign contribution compliance, renewal, return filing, and prior permission support.",
    items: [
      {
        title: "FCRA Compliance Services",
        badge: "INR 10000+",
        description: "Focus on your work while we take care of all FCRA related compliances with our experts.",
        icon: ShieldCheck,
        color: "text-yellow-400",
        panel: "border-yellow-500/20 bg-yellow-500/10",
      },
      {
        title: "FCRA Renewal & FCRA Return Filing",
        badge: "Contact Us",
        description: "Our experience will help you to get the speedy renewal.",
        icon: RefreshCw,
        color: "text-rose-400",
        panel: "border-rose-500/20 bg-rose-500/10",
      },
      {
        title: "FCRA Prior Permission",
        badge: "Contact Us",
        description: "Before going for this call us whether you qualified or not.",
        icon: Handshake,
        color: "text-slate-300",
        panel: "border-slate-500/20 bg-slate-500/10",
      },
    ],
  },
  {
    title: "Tax & Audit Services",
    summary: "PAN, TAN, and tax-linked identifiers needed for regular operations.",
    items: [
      {
        title: "PAN Card",
        badge: "Contact Us",
        description: "Now getting e-PAN Card of individual is free. Visit Income Tax India official website.",
        icon: IdCard,
        color: "text-rose-400",
        panel: "border-rose-500/20 bg-rose-500/10",
      },
      {
        title: "TAN Number",
        badge: "Contact Us",
        description: "Require to deduct TDS of vendor or services provider.",
        icon: Hash,
        color: "text-slate-300",
        panel: "border-slate-500/20 bg-slate-500/10",
      },
    ],
  },
]

type FormState = { name: string; email: string; phone: string; service: string; message: string }

function ConsultationModal({ service, onClose }: { service: string; onClose: () => void }) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", service, message: "" })
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
      toast.success("Request sent! We'll get back to you within 24 hours.")
    } catch {
      toast.error("Failed to send. Please try again or email us directly.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-lg glass-card rounded-2xl border border-(--border) p-5 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full glass border border-(--border) flex items-center justify-center text-[var(--text-muted)] hover:text-(--text) transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-6 sm:py-10">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-(--text) mb-3" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              Request Sent!
            </h3>
            <p className="text-[var(--text-muted)] mb-6">We&apos;ll get back to you within 24 hours.</p>
            <button onClick={onClose} className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-6 pr-8">
              <h2 className="text-lg sm:text-xl font-bold text-(--text)" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                Book a Free Consultation
              </h2>
              <p className="text-sm text-[var(--text-muted)] mt-1">Fill in your details and we&apos;ll reach out shortly.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
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

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-2">Phone Number</label>
                <input
                  type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="+91 00000 00000"
                  className="w-full px-4 py-3 rounded-xl glass border border-(--border) text-(--text) placeholder-[var(--text-muted)] focus:outline-none focus:border-primary-500/40 bg-transparent transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-2">Service</label>
                <select
                  name="service" value={form.service} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl glass border border-(--border) text-(--text) focus:outline-none focus:border-primary-500/40 bg-[var(--bg-card)] transition-colors text-sm"
                >
                  <option value="" className="bg-[var(--bg-card)]">Select a service</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s} className="bg-[var(--bg-card)]">{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-2">Message *</label>
              <textarea
                required name="message" value={form.message} onChange={handleChange}
                rows={4} placeholder="Tell us about your needs..."
                className="w-full px-4 py-3 rounded-xl glass border border-(--border) text-(--text) placeholder-[var(--text-muted)] focus:outline-none focus:border-primary-500/40 bg-transparent transition-colors text-sm resize-none"
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 shimmer-btn text-white font-semibold px-6 py-4 rounded-xl hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-primary-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {loading ? "Sending..." : "Send Request"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}

export default function ServicesPage() {
  const [modalService, setModalService] = useState<string | null>(null)
  const [activeRegistrationCategory, setActiveRegistrationCategory] = useState(registrationCategories[0].title)
  const selectedRegistrationCategory =
    registrationCategories.find((category) => category.title === activeRegistrationCategory) ?? registrationCategories[0]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 hero-bg dot-grid overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/6 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary-500/20 mb-6">
              <span className="text-xs font-medium text-primary-400 uppercase tracking-wider">Our Services</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-(--text) mb-6" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              Professional Services<br />
              <span className="gradient-text">Built for Impact</span>
            </h1>
            <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-2xl mx-auto">
              From accounting and tax advisory to NGO compliance and training — we provide end-to-end consulting services that empower your organization.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </section>

      {/* Services list */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`glass-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-(--border-soft) ${service.accent} transition-all duration-300`}
              >
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
                  <div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} border ${service.iconBg} flex items-center justify-center mb-6`}>
                      <Icon className={`w-7 h-7 ${service.iconColor}`} />
                    </div>
                    <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">{service.tagline}</div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-(--text) mb-4" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                      {service.title}
                    </h2>
                    <p className="text-[var(--text-muted)] leading-relaxed mb-8">{service.description}</p>
                    <button
                      onClick={() => setModalService(service.formService)}
                      className="inline-flex items-center gap-2 shimmer-btn text-white font-semibold px-6 py-3 rounded-xl text-sm hover:scale-105 transition-all duration-200 shadow-lg shadow-primary-500/20"
                    >
                      <Phone className="w-4 h-4" />
                      Get a Free Consultation
                    </button>
                  </div>

                  <div>
                    <h4 className="text-(--text) font-semibold mb-5 text-sm uppercase tracking-wider">What&apos;s Included</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-4 h-4 ${service.iconColor} mt-0.5 flex-shrink-0`} />
                          <span className="text-sm text-[var(--text-muted)]">{feature}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Registration browser */}
      <section id="registration-options" className="section-py section-bg-alt border-y border-(--border-soft)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet-500/20 mb-5">
              <ClipboardList className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs font-medium text-violet-300 uppercase tracking-wider">Registration Service</span>
            </div>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-(--text)" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                  Choose the exact registration support you need
                </h2>
              </div>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Browse by category first, then send a request for the specific service. This keeps statutory registrations, FCRA work, and tax identifiers easy to scan.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex gap-3 overflow-x-auto pb-2 lg:block lg:space-y-3 lg:overflow-visible lg:pb-0">
                {registrationCategories.map((category) => {
                  const selected = selectedRegistrationCategory.title === category.title
                  return (
                    <button
                      key={category.title}
                      type="button"
                      onClick={() => setActiveRegistrationCategory(category.title)}
                      className={`min-w-[250px] rounded-2xl border p-4 text-left transition-all duration-200 lg:min-w-0 lg:w-full ${
                        selected
                          ? "border-violet-500/40 bg-violet-500/10 shadow-lg shadow-violet-950/20"
                          : "border-(--border-soft) bg-(--surface)/40 hover:border-violet-500/25 hover:bg-(--surface)"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className={`text-sm font-semibold ${selected ? "text-(--text)" : "text-[var(--text-muted)]"}`}>
                          {category.title}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          selected ? "bg-violet-500/20 text-violet-200" : "bg-(--bg-card) text-[var(--text-muted)]"
                        }`}>
                          {category.items.length}
                        </span>
                      </span>
                      <span className="mt-2 block text-xs leading-relaxed text-[var(--text-muted)]">{category.summary}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRegistrationCategory.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="min-w-0"
              >
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-(--text)" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                      {selectedRegistrationCategory.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">{selectedRegistrationCategory.summary}</p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    {selectedRegistrationCategory.items.length} services
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {selectedRegistrationCategory.items.map((option) => {
                    const OptionIcon = option.icon
                    return (
                      <button
                        key={option.title}
                        type="button"
                        onClick={() => setModalService(option.title)}
                        className="group min-h-44 rounded-2xl border border-(--border-soft) bg-(--bg-card)/70 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-(--surface)"
                      >
                        <span className="flex h-full flex-col">
                          <span className="mb-4 flex items-start justify-between gap-4">
                            <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border ${option.panel}`}>
                              <OptionIcon className={`h-5 w-5 ${option.color}`} />
                            </span>
                            <span className="rounded-md bg-green-500/15 px-2 py-1 text-[11px] font-semibold text-green-300">
                              {option.badge}
                            </span>
                          </span>
                          <span className="block text-base font-semibold text-(--text)">{option.title}</span>
                          <span className="mt-2 block flex-1 text-sm leading-relaxed text-[var(--text-muted)]">{option.description}</span>
                          <span className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary-300 transition-colors group-hover:text-primary-200">
                            Send Request
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py section-bg-alt border-t border-(--border-soft)">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-(--text) mb-5" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              Not Sure Which Service You Need?
            </h2>
            <p className="text-[var(--text-muted)] mb-8">Let our experts guide you. Book a free consultation and we&apos;ll recommend the right services for your organization.</p>
            <button
              onClick={() => setModalService("Other")}
              className="inline-flex items-center gap-2 shimmer-btn text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-primary-500/25 hover:scale-105 transition-all duration-200"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Consultation Modal */}
      <AnimatePresence>
        {modalService !== null && (
          <ConsultationModal
            service={modalService}
            onClose={() => setModalService(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
