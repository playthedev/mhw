import { Globe, Mail, Phone, MapPin, Bell, ExternalLink } from "lucide-react"

export default function SettingsAdminPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-(--text) mb-1" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          Settings
        </h1>
        <p className="text-[var(--text-muted)] text-sm">Site configuration and contact details</p>
      </div>

      <div className="grid gap-5">
        {/* Business Info */}
        <div className="glass-card rounded-2xl border border-(--border-soft) overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-(--border-soft)">
            <div className="w-8 h-8 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
              <Globe className="w-4 h-4 text-primary-400" />
            </div>
            <h2 className="text-(--text) font-semibold" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>Business Info</h2>
          </div>
          <div className="p-6 space-y-5">
            <SettingRow icon={<Globe className="w-4 h-4" />} label="Company Name" value="MHW Consultancy Pvt. Ltd." />
            <SettingRow icon={<MapPin className="w-4 h-4" />} label="Address" value="India" />
            <SettingRow icon={<Mail className="w-4 h-4" />} label="Contact Email" value="info@mhwconsultancy.in" />
            <SettingRow icon={<Phone className="w-4 h-4" />} label="Phone" value="+91 98765 43210" />
          </div>
        </div>

        {/* Email Notifications */}
        <div className="glass-card rounded-2xl border border-(--border-soft) overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-(--border-soft)">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Bell className="w-4 h-4 text-purple-400" />
            </div>
            <h2 className="text-(--text) font-semibold" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>Email Notifications</h2>
          </div>
          <div className="p-6 space-y-5">
            <NotifRow label="New contact form submission" description="You receive an email when someone fills the contact form" enabled />
            <NotifRow label="New enrollment" description="You receive an email when a student enrolls in a course" enabled />
            <NotifRow label="Email verification" description="Students receive a verification email on registration" enabled />
            <NotifRow label="Password reset" description="Students receive a reset link when they request it" enabled />
          </div>
        </div>

        {/* Quick Links */}
        {/* <div className="glass-card rounded-2xl border border-(--border-soft) overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-(--border-soft)">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <ExternalLink className="w-4 h-4 text-blue-400" />
            </div>
            <h2 className="text-(--text) font-semibold" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>Quick Links</h2>
          </div>
          <div className="p-6 space-y-3">
            <QuickLink label="MongoDB Atlas — manage database" href="https://cloud.mongodb.com" />
            <QuickLink label="Resend — email dashboard" href="https://resend.com" />
            <QuickLink label="Stripe — payment dashboard" href="https://dashboard.stripe.com" />
          </div>
        </div>

        <p className="text-xs text-[var(--text-muted)] text-center pb-2">
          To change these values, update <code className="text-primary-400">.env.local</code> and restart the server.
        </p> */}
      </div>
    </div>
  )
}

function SettingRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
        {icon}
        {label}
      </div>
      <span className="text-sm text-(--text) font-medium text-right">{value}</span>
    </div>
  )
}

function NotifRow({
  label,
  description,
  enabled,
}: {
  label: string
  description: string
  enabled: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm text-(--text) font-medium">{label}</p>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">{description}</p>
      </div>
      <span className={`flex-shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
        enabled
          ? "bg-green-500/10 text-green-400 border-green-500/20"
          : "bg-[var(--text-muted)]/10 text-[var(--text-muted)] border-[var(--text-muted)]/20"
      }`}>
        {enabled ? "On" : "Off"}
      </span>
    </div>
  )
}

function QuickLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-(--surface-faint) border border-(--border-soft) hover:border-(--border) hover:bg-(--surface) transition-all group"
    >
      <span className="text-sm text-[var(--text-muted)] group-hover:text-(--text) transition-colors">{label}</span>
      <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-primary-400 transition-colors flex-shrink-0" />
    </a>
  )
}
