import Link from "next/link"
import { Briefcase } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden hero-bg dot-grid">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 mb-8 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform">
          <Briefcase className="w-5 h-5 text-(--text)" />
        </div>
        <span className="text-xl font-bold" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          <span className="text-(--text)">MHW</span>
          <span className="gradient-text-blue"> Consultancy</span>
        </span>
      </Link>

      <div className="relative w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
