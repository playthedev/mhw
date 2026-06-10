"use client"

import { motion } from "framer-motion"
import { Target, Eye, Heart, Award, Users, Globe, ExternalLink, Mail } from "lucide-react"

const team = [
  {
    name: "Manish Mandal",
    role: "Founder & Managing Director",
    bio: "15+ years of experience in NGO compliance, accounting, and corporate advisory. Leads MHW Consultancy's vision and client strategy.",
    avatar: "MM",
    gradient: "from-blue-500 to-primary-500",
    linkedin: "#",
    email: "manish@mhwconsultancy.in",
  },
  {
    name: "Priya Sharma",
    role: "Head of Accounting",
    bio: "Chartered Accountant with 10+ years specializing in non-profit financial management and statutory audit.",
    avatar: "PS",
    gradient: "from-purple-500 to-pink-500",
    linkedin: "#",
    email: "priya@mhwconsultancy.in",
  },
  {
    name: "Rahul Verma",
    role: "Tax Director",
    bio: "Income Tax & GST practitioner with expertise in corporate and NGO taxation, handling 200+ cases annually.",
    avatar: "RV",
    gradient: "from-green-500 to-teal-500",
    linkedin: "#",
    email: "rahul@mhwconsultancy.in",
  },
  {
    name: "Anjali Gupta",
    role: "Legal & Compliance Head",
    bio: "Corporate lawyer specializing in NGO registration, FCRA compliance, governance frameworks, and regulatory filings.",
    avatar: "AG",
    gradient: "from-orange-500 to-gold-500",
    linkedin: "#",
    email: "anjali@mhwconsultancy.in",
  },
  {
    name: "Suresh Kumar",
    role: "Training Director",
    bio: "Expert trainer in NGO capacity building with over 5,000 professionals trained across India.",
    avatar: "SK",
    gradient: "from-pink-500 to-rose-500",
    linkedin: "#",
    email: "suresh@mhwconsultancy.in",
  },
  {
    name: "Neha Singh",
    role: "Business Development",
    bio: "10+ years in consulting business development, client relations, and strategic partnerships across Delhi NCR.",
    avatar: "NS",
    gradient: "from-cyan-500 to-sky-500",
    linkedin: "#",
    email: "neha@mhwconsultancy.in",
  },
]

const values = [
  { icon: Target, title: "Mission", description: "To empower NGOs, businesses, and professionals through expert consulting, compliance guidance, and transformative training programs across India." },
  { icon: Eye, title: "Vision", description: "To become India's most trusted consulting partner, known for integrity, expertise, and measurable impact across all sectors." },
  { icon: Heart, title: "Values", description: "We operate on integrity, transparency, and a genuine commitment to our clients' success. Every engagement is a partnership built on trust." },
]

const milestones = [
  { year: "2015", event: "MHW Consultancy founded with a focus on NGO compliance in Delhi" },
  { year: "2017", event: "Expanded to corporate advisory and GST/income tax services" },
  { year: "2019", event: "Launched online training platform with 10 courses" },
  { year: "2021", event: "Crossed 200+ active clients milestone" },
  { year: "2023", event: "Launched NGO Internship Program" },
  { year: "2026", event: "500+ clients, 2800+ students enrolled across India" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 hero-bg dot-grid overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary-500/20 mb-6">
              <span className="text-xs font-medium text-primary-400 uppercase tracking-wider">About Us</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-(--text) mb-6 leading-tight" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              We Are <span className="gradient-text">MHW Consultancy</span>
            </h1>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              Founded in 2015, MHW Consultancy Private Limited has grown from a small accounting firm to one of Delhi's leading consulting organizations. We specialize in NGO compliance, accounting, tax advisory, and professional training.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-py">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-8 border border-(--border-soft) text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-(--text) mb-4" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{v.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{v.description}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Users, value: "500+", label: "Clients Served" },
              { icon: Award, value: "11", label: "Years Experience" },
              { icon: Globe, value: "2800+", label: "Students Trained" },
              { icon: Heart, value: "98%", label: "Client Retention" },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card rounded-2xl p-6 border border-(--border-soft) text-center"
                >
                  <Icon className="w-6 h-6 text-primary-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold gradient-text-blue mb-1" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{stat.value}</div>
                  <div className="text-xs text-[var(--text-muted)]">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-(--text) text-center mb-12"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
            >
              Our <span className="gradient-text">Journey</span>
            </motion.h2>
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-(--surface) hidden md:block" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={`flex flex-col items-start md:items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div className={`w-full md:flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <div className="glass-card rounded-xl p-5 border border-(--border-soft) inline-block max-w-full">
                        <span className="text-primary-400 font-bold text-lg">{m.year}</span>
                        <p className="text-[var(--text-muted)] text-sm mt-1">{m.event}</p>
                      </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-primary-500 border-2 border-primary-300 flex-shrink-0 hidden md:block" />
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Team */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-(--text) mb-4" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                Meet the <span className="gradient-text">Team</span>
              </h2>
              <p className="text-[var(--text-muted)] max-w-lg mx-auto">Experts passionate about empowering organizations and professionals across India.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card rounded-2xl p-6 border border-(--border-soft) hover:border-(--border) transition-all group"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-xl font-bold mb-5 group-hover:scale-105 transition-transform`}>
                    {member.avatar}
                  </div>
                  <h3 className="text-(--text) font-semibold text-lg mb-1" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{member.name}</h3>
                  <p className="text-primary-400 text-sm mb-3">{member.role}</p>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-5">{member.bio}</p>
                  <div className="flex items-center gap-2">
                    <a href={member.linkedin} className="w-8 h-8 rounded-lg bg-(--surface) flex items-center justify-center text-[var(--text-muted)] hover:text-(--text) hover:bg-primary-500/10 transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a href={`mailto:${member.email}`} className="w-8 h-8 rounded-lg bg-(--surface) flex items-center justify-center text-[var(--text-muted)] hover:text-(--text) hover:bg-primary-500/10 transition-all">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
