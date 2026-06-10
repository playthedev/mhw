import AdminSidebar from "@/components/admin/AdminSidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[var(--bg-deep)]">
      <AdminSidebar />
      <main className="flex-1 min-w-0 lg:ml-64 pt-20 px-4 pb-8 lg:pt-8 lg:px-8">{children}</main>
    </div>
  )
}
