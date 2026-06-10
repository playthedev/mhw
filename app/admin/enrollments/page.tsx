import { getDb } from "@/lib/mongodb"
import { Users } from "lucide-react"

export const dynamic = "force-dynamic"

const statusColors: Record<string, string> = {
  active: "bg-green-500/10 text-green-400 border-green-500/20",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  completed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  paid: "bg-green-500/10 text-green-400 border-green-500/20",
  failed: "bg-red-500/10 text-red-400 border-red-500/20",
  refunded: "bg-purple-500/10 text-purple-400 border-purple-500/20",
}

export default async function EnrollmentsAdminPage() {
  const db = await getDb()
  const enrollments = await db
    .collection("enrollments")
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  const totalRevenue = enrollments
    .filter((e) => e.paymentStatus === "paid")
    .reduce((sum, e) => sum + (e.amount || 0), 0)

  const formattedRevenue = new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(totalRevenue)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-(--text) mb-1" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
            Enrollments
          </h1>
          <p className="text-[var(--text-muted)] text-sm">
            {enrollments.length} total · {formattedRevenue} collected
          </p>
        </div>
      </div>

      {enrollments.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 border border-(--border-soft) text-center">
          <Users className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-(--text) font-medium mb-1">No enrollments yet</p>
          <p className="text-[var(--text-muted)] text-sm">Enrolments will appear here after students complete checkout.</p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl border border-(--border-soft) overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-(--border-soft)">
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border-soft)">
                {enrollments.map((row) => {
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
                      <td className="px-6 py-4 text-sm text-[var(--text-muted)] max-w-xs truncate">{row.courseName}</td>
                      <td className="px-6 py-4 text-sm text-(--text) font-medium">{amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[row.status] || statusColors.pending}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[row.paymentStatus] || statusColors.pending}`}>
                          {row.paymentStatus}
                        </span>
                      </td>
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
