import type { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme/ThemeProvider"

const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem("mhw-theme");
    if (theme !== "light" && theme !== "dark") theme = "dark";
    document.documentElement.classList.add(theme);
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "MHW Consultancy — Accounting, Compliance & NGO Consulting",
    template: "%s | MHW Consultancy",
  },
  description:
    "Professional consulting services in accounting, compliance, NGO advisory, and training. Empowering organizations with expert guidance across India.",
  keywords: ["consulting", "accounting", "NGO compliance", "training", "courses", "Delhi", "India"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "MHW Consultancy",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
