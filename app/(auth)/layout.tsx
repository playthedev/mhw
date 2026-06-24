import Link from "next/link"
import Logo from "@/components/ui/Logo"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden hero-bg dot-grid">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <Link href="/" className="flex items-center mb-8 group">
        <Logo className="h-16 w-auto group-hover:scale-110 transition-transform" />
      </Link>

      <div className="relative w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
