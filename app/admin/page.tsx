import { Users, CreditCard, MessageSquare, BookOpen, TrendingUp, ArrowUpRight } from "lucide-react"

const stats = [
  { label: "Total Enrollments", value: "2,847", change: "+12%", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { label: "Revenue (Month)", value: "₹2,84,700", change: "+8%", icon: CreditCard, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  { label: "New Messages", value: "24", change: "+5", icon: MessageSquare, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { label: "Active Courses", value: "6", change: "+1", icon: BookOpen, color: "text-gold-400", bg: "bg-gold-500/10 border-gold-500/20" },
]

const recentEnrollments = [
  { name: "Amit Sharma", course: "NGO Management", amount: "₹15,000", status: "paid", date: "2026-06-03" },
  { name: "Priya Singh", course: "Accounting Basics", amount: "₹12,000", status: "paid", date: "2026-06-02" },
  { name: "Rohit Verma", course: "Tax Compliance", amount: "₹20,000", status: "paid", date: "2026-06-01" },
  { name: "Kavya Gupta", course: "Internship Program", amount: "₹25,000", status: "pending", date: "2026-05-31" },
]

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-(--text) mb-1" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>Dashboard</h1>
        <p className="text-[var(--text-muted)] text-sm">Welcome back, Admin</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="glass-card rounded-2xl p-5 border border-(--border-soft)">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} border flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-(--text) mb-1" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{stat.value}</div>
              <div className="text-xs text-[var(--text-muted)]">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Recent enrollments */}
      <div className="glass-card rounded-2xl border border-(--border-soft) overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-(--border-soft)">
          <h2 className="text-(--text) font-semibold" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>Recent Enrollments</h2>
          <a href="/admin/enrollments" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors">
            View all <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-(--border-soft)">
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-soft)">
              {recentEnrollments.map((row) => (
                <tr key={row.name} className="hover:bg-(--surface-faint) transition-colors">
                  <td className="px-6 py-4 text-sm text-(--text) font-medium">{row.name}</td>
                  <td className="px-6 py-4 text-sm text-[var(--text-muted)]">{row.course}</td>
                  <td className="px-6 py-4 text-sm text-(--text)">{row.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      row.status === "paid"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--text-muted)]">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
