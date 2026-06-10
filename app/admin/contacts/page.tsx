import { getDb } from "@/lib/mongodb"
import { Mail, Phone, Calendar, Tag } from "lucide-react"

export const dynamic = "force-dynamic"

const statusColors: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  read: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  replied: "bg-green-500/10 text-green-400 border-green-500/20",
}

export default async function ContactsAdminPage() {
  const db = await getDb()
  const contacts = await db
    .collection("contact_submissions")
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  const newCount = contacts.filter((c) => c.status === "new").length

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-(--text) mb-1" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          Contact Inbox
        </h1>
        <p className="text-[var(--text-muted)] text-sm">
          {newCount > 0 ? `${newCount} new message${newCount > 1 ? "s" : ""}` : "No new messages"}
        </p>
      </div>

      {contacts.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 border border-(--border-soft) text-center">
          <Mail className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-(--text) font-medium mb-1">No contact submissions yet</p>
          <p className="text-[var(--text-muted)] text-sm">Messages from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => {
            const date = new Date(contact.createdAt).toLocaleDateString("en-IN", {
              day: "numeric", month: "short", year: "numeric",
            })
            return (
              <div key={contact._id.toString()} className="glass-card rounded-2xl p-6 border border-(--border-soft) hover:border-(--border) transition-all">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-(--text) font-semibold">{contact.name}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[contact.status] || statusColors.new}`}>
                        {contact.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{contact.email}</span>
                      {contact.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{contact.phone}</span>}
                      <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{contact.subject}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{date}</span>
                    </div>
                  </div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex-shrink-0 text-xs shimmer-btn text-white font-medium px-4 py-2 rounded-xl"
                  >
                    Reply
                  </a>
                </div>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed bg-(--surface-faint) rounded-xl p-4 border border-(--border-soft)">
                  {contact.message}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
