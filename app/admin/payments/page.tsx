import { getDb } from "@/lib/mongodb"
import { CreditCard } from "lucide-react"

export const dynamic = "force-dynamic"

const statusColors: Record<string, string> = {
  paid: "bg-green-500/10 text-green-400 border-green-500/20",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  failed: "bg-red-500/10 text-red-400 border-red-500/20",
  refunded: "bg-purple-500/10 text-purple-400 border-purple-500/20",
}

export default async function PaymentsAdminPage() {
  const db = await getDb()
  const payments = await db
    .collection("enrollments")
    .find({ paymentGateway: "razorpay" })
    .sort({ createdAt: -1 })
    .toArray()

  const totalRevenue = payments
    .filter((p) => p.paymentStatus === "paid")
    .reduce((sum, p) => sum + (p.amount || 0), 0)

  const formattedRevenue = new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(totalRevenue)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-(--text) mb-1" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          Payments
        </h1>
        <p className="text-[var(--text-muted)] text-sm">
          {payments.length} transactions · {formattedRevenue} total
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 border border-(--border-soft) text-center">
          <CreditCard className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-(--text) font-medium mb-1">No payments yet</p>
          <p className="text-[var(--text-muted)] text-sm">Payment transactions will appear here after students complete checkout.</p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl border border-(--border-soft) overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-(--border-soft)">
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border-soft)">
                {payments.map((row) => {
                  const date = new Date(row.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                  })
                  const amount = new Intl.NumberFormat("en-IN", {
                    style: "currency", currency: "INR", maximumFractionDigits: 0,
                  }).format(row.amount)

                  return (
                    <tr key={row._id.toString()} className="hover:bg-(--surface-faint) transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm text-(--text) font-medium">{row.customerName || "—"}</div>
                        <div className="text-xs text-[var(--text-muted)]">{row.customerEmail}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[var(--text-muted)] max-w-xs truncate">{row.description || row.courseName || "—"}</td>
                      <td className="px-6 py-4 text-sm text-(--text) font-medium">{amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[row.paymentStatus] || statusColors.pending}`}>
                          {row.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-[var(--text-muted)] font-mono">{row.razorpayPaymentId || row.transactionId || "—"}</td>
                      <td className="px-6 py-4 text-sm text-[var(--text-muted)]">{date}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
