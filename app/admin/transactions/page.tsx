import { getDb } from "@/lib/mongodb"
import { Receipt, CheckCircle2, XCircle } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function TransactionsAdminPage() {
  const db = await getDb()
  const transactions = await db
    .collection("transactions")
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  const validCount = transactions.filter((t) => t.signatureValid).length
  const totalAmount = transactions
    .filter((t) => t.signatureValid)
    .reduce((sum, t) => sum + (t.amount || 0), 0)

  const formattedTotal = new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(totalAmount)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-(--text) mb-1" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          Transactions
        </h1>
        <p className="text-[var(--text-muted)] text-sm">
          {transactions.length} total · {validCount} verified · {formattedTotal} confirmed
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-card rounded-2xl border border-(--border-soft) p-5">
          <p className="text-xs text-[var(--text-muted)] mb-1">Total Attempts</p>
          <p className="text-2xl font-bold text-(--text)">{transactions.length}</p>
        </div>
        <div className="glass-card rounded-2xl border border-(--border-soft) p-5">
          <p className="text-xs text-[var(--text-muted)] mb-1">Verified Payments</p>
          <p className="text-2xl font-bold text-green-400">{validCount}</p>
        </div>
        <div className="glass-card rounded-2xl border border-(--border-soft) p-5">
          <p className="text-xs text-[var(--text-muted)] mb-1">Failed / Tampered</p>
          <p className="text-2xl font-bold text-red-400">{transactions.length - validCount}</p>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 border border-(--border-soft) text-center">
          <Receipt className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-(--text) font-medium mb-1">No transactions yet</p>
          <p className="text-[var(--text-muted)] text-sm">Every payment attempt will be logged here, including failed ones.</p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl border border-(--border-soft) overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-(--border-soft)">
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Signature</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Payment ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border-soft)">
                {transactions.map((row) => {
                  const date = new Date(row.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                  })
                  const time = new Date(row.createdAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit", minute: "2-digit",
                  })
                  const amount = new Intl.NumberFormat("en-IN", {
                    style: "currency", currency: "INR", maximumFractionDigits: 0,
                  }).format(row.amount)

                  return (
                    <tr key={row._id.toString()} className="hover:bg-(--surface-faint) transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm text-(--text) font-medium">{row.customerName || "—"}</div>
                        <div className="text-xs text-[var(--text-muted)]">{row.customerEmail || "—"}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[var(--text-muted)] max-w-[180px] truncate">{row.courseName || "—"}</td>
                      <td className="px-6 py-4 text-sm text-(--text) font-medium">{amount}</td>
                      <td className="px-6 py-4">
                        {row.signatureValid ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                            <CheckCircle2 className="w-3 h-3" /> Valid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                            <XCircle className="w-3 h-3" /> Invalid
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs text-[var(--text-muted)] font-mono max-w-[160px] truncate" title={row.razorpayPaymentId}>
                        {row.razorpayPaymentId || "—"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-[var(--text-muted)]">{date}</div>
                        <div className="text-xs text-[var(--text-faint)]">{time}</div>
                      </td>
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
