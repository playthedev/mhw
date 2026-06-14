import Link from "next/link"
import { Briefcase, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  Services: [
    { label: "Accounting", href: "/services#accounting" },
    { label: "NGO Compliance", href: "/services#ngo" },
    { label: "Tax Advisory", href: "/services#tax" },
    { label: "Audit Support", href: "/services#audit" },
  ],
  Courses: [
    { label: "NGO Management", href: "/courses" },
    { label: "Accounting Basics", href: "/courses" },
    { label: "Compliance Training", href: "/courses" },
    { label: "Internship Program", href: "/courses" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Study Resources", href: "/study" },
    { label: "Contact", href: "/contact" },
    { label: "Admin", href: "/admin" },
  ],
}

const socials = [
  {
    href: "https://www.linkedin.com/company/mhw-consultancy-pvt-ltd/about/?viewAsMember=true",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/mhwconsultancy/",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/mhwconsultancy",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: "https://twitter.com/mhwconsultancy",
    label: "X (Twitter)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@mhwconsultancy",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund & Cancellation Policy", href: "/refund-policy" },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-(--border-soft) overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <Briefcase className="w-5 h-5 text-(--text)" />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                <span className="text-(--text)">MHW</span>
                <span className="gradient-text-blue"> Consultancy</span>
              </span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 max-w-xs">
              Empowering NGOs, businesses, and individuals with professional consulting, compliance, and training services across India.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a href="mailto:info@mhwconsultancy.in" className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-(--text) transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-(--surface) flex items-center justify-center group-hover:bg-primary-500/10 transition-colors">
                  <Mail className="w-4 h-4 text-primary-400" />
                </div>
                info@mhwconsultancy.in
              </a>
              <a href="tel:+917065127127" className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-(--text) transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-(--surface) flex items-center justify-center group-hover:bg-primary-500/10 transition-colors">
                  <Phone className="w-4 h-4 text-primary-400" />
                </div>
                +91 70651 27127
              </a>
              <div className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                <div className="w-8 h-8 rounded-lg bg-(--surface) flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary-400" />
                </div>
                Kasra no 839, First Floor, Aman Vihar, Kadipur, Delhi
              </div>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-(--text) font-semibold text-sm mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-muted)] hover:text-(--text) transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-(--border-soft) flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-muted)]">
              © {new Date().getFullYear()} MHW Consultancy Pvt. Ltd. All rights reserved.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {socials.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-(--surface) border border-(--border-soft) flex items-center justify-center text-[var(--text-muted)] hover:text-(--text) hover:bg-primary-500/10 hover:border-primary-500/20 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center sm:justify-start">
            {legalLinks.map(({ label, href }, i) => (
              <span key={label} className="flex items-center gap-5">
                <Link href={href} className="text-xs text-[var(--text-muted)] hover:text-(--text) transition-colors">
                  {label}
                </Link>
                {i < legalLinks.length - 1 && <span className="text-(--text)/10">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
