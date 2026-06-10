"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "sonner"
import { Loader2, ShoppingCart, PlayCircle } from "lucide-react"
import Link from "next/link"

interface Props {
  courseId: string
  courseName: string
  price: number
  className?: string
  size?: "default" | "large"
}

declare global {
  interface Window { Razorpay: any }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) { resolve(true); return }
    const script = document.createElement("script")
    script.id = "razorpay-script"
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function EnrollButton({ courseId, courseName, price, className, size = "default" }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const [checkingEnrollment, setCheckingEnrollment] = useState(true)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [loading, setLoading] = useState(false)

  // On mount, check if this user is already enrolled
  useEffect(() => {
    fetch(`/api/enrollment/check?courseId=${courseId}`)
      .then((r) => r.json())
      .then((data) => {
        setIsEnrolled(data.enrolled)
        setCheckingEnrollment(false)
      })
      .catch(() => setCheckingEnrollment(false))
  }, [courseId])

  const handleEnroll = async () => {
    if (loading) return
    setLoading(true)
    try {
      // Fetch session — redirects to login if not authenticated
      const res = await fetch("/api/auth/me")
      if (res.status === 401) {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
        setLoading(false)
        return
      }
      const { user } = await res.json()

      const loaded = await loadRazorpayScript()
      if (!loaded) throw new Error("Could not load payment gateway. Check your connection and try again.")

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      })
      const orderData = await orderRes.json()
      if (!orderRes.ok) throw new Error(orderData.error || "Failed to create order")

      const { orderId, amount, currency, keyId } = orderData

      const options = {
        key: keyId,
        amount,
        currency,
        name: "MHW Consultancy",
        description: courseName,
        order_id: orderId,
        prefill: { name: user.name, email: user.email },
        handler: async (response: {
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
        }) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...response, courseId }),
            })
            const verifyData = await verifyRes.json()
            if (!verifyRes.ok) throw new Error(verifyData.error || "Payment verification failed")

            toast.success("Enrollment confirmed! Check your email for details.")
            setIsEnrolled(true)
            setLoading(false)
            window.location.href = `/dashboard`
          } catch (err: any) {
            toast.error(err.message || "Payment verification failed. Contact support.")
            setLoading(false)
          }
        },
        theme: { color: "#4f5eff", backdrop_color: "rgba(10,10,15,0.85)" },
        modal: { ondismiss: () => setLoading(false) },
      }

      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", (response: any) => {
        toast.error(`Payment failed: ${response.error.description}`)
        setLoading(false)
      })
      rzp.open()
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  const base =
    size === "large"
      ? "flex items-center justify-center gap-2 w-full py-4 rounded-xl text-base font-semibold transition-all duration-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
      : "flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"

  // ── Already enrolled ──
  if (isEnrolled) {
    return (
      <Link
        href={`/dashboard/courses/${courseId}`}
        className={`${base} bg-green-600/20 border border-green-500/30 text-green-400 hover:bg-green-600/30 ${className ?? ""}`}
      >
        <PlayCircle className="w-4 h-4" />
        {size === "large" ? "Continue Learning" : "Continue"}
      </Link>
    )
  }

  // ── Loading enrollment state ──
  if (checkingEnrollment) {
    return (
      <button disabled className={`${base} shimmer-btn text-white opacity-60 ${className ?? ""}`}>
        <Loader2 className="w-4 h-4 animate-spin" />
        {size === "large" ? "Loading…" : "…"}
      </button>
    )
  }

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className={`${base} shimmer-btn text-white shadow-primary-500/20 hover:scale-[1.02] ${className ?? ""}`}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
      {loading ? "Processing…" : "Enroll Now"}
    </button>
  )
}
