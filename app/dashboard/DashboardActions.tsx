"use client"

import Link from "next/link"
import { useLinkStatus } from "next/link"
import { Receipt, Award, Play, Loader2 } from "lucide-react"

/**
 * Inline pending indicator for a <Link>. Must be rendered as a descendant of
 * the Link it tracks. Swaps the link's icon for a spinner while navigation to
 * a dynamic (server-rendered) route is in flight, so rapid repeat clicks have
 * visible feedback instead of feeling unresponsive.
 */
function PendingIcon({ Icon }: { Icon: typeof Receipt }) {
  const { pending } = useLinkStatus()
  return pending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Icon className="w-3.5 h-3.5" />
}

interface Props {
  courseId: string
  razorpayPaymentId?: string | null
  isCompleted: boolean
  percent: number
}

export default function DashboardActions({ courseId, razorpayPaymentId, isCompleted, percent }: Props) {
  return (
    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap sm:flex-shrink-0">
      {razorpayPaymentId && (
        <Link
          href={`/dashboard/invoice/${razorpayPaymentId}`}
          prefetch={false}
          className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-(--text) border border-(--border) hover:border-(--border-strong) px-3 py-1.5 rounded-lg transition-all"
          title="Download GST Invoice"
        >
          <PendingIcon Icon={Receipt} />
          <span className="hidden sm:inline">Invoice</span>
        </Link>
      )}
      {isCompleted && (
        <Link
          href={`/dashboard/certificate/${courseId}`}
          prefetch={false}
          className="flex items-center gap-1.5 text-xs text-gold-400 bg-gold-500/10 border border-gold-500/20 hover:bg-gold-500/15 px-3 py-1.5 rounded-lg transition-all"
        >
          <PendingIcon Icon={Award} />
          <span className="hidden sm:inline">Certificate</span>
        </Link>
      )}
      <Link
        href={`/dashboard/courses/${courseId}`}
        prefetch={false}
        className="shimmer-btn flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-lg"
      >
        <PendingIcon Icon={Play} />
        {percent === 0 ? "Start" : isCompleted ? "Review" : "Continue"}
      </Link>
    </div>
  )
}
