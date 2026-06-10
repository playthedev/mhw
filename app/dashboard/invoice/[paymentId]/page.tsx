import { redirect, notFound } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"
import InvoiceClient from "./InvoiceClient"

export const dynamic = "force-dynamic"

export default async function InvoicePage({ params }: { params: Promise<{ paymentId: string }> }) {
  const session = await getSession()
  if (!session) redirect("/login")

  const { paymentId } = await params

  const db = await getDb()
  const enrollment = await db.collection("enrollments").findOne({
    razorpayPaymentId: paymentId,
    customerEmail: session.email,
  })

  if (!enrollment) notFound()

  const invoiceNo = `MHW-INV-${enrollment.razorpayOrderId?.slice(-8).toUpperCase() ?? paymentId.slice(-8).toUpperCase()}`
  const invoiceDate = new Date(enrollment.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
  })

  const baseAmount = Math.round(enrollment.amount / 1.18)    // reverse-calc base from total
  const gstAmount  = enrollment.amount - baseAmount
  const igstRate   = 18

  return (
    <InvoiceClient
      invoiceNo={invoiceNo}
      invoiceDate={invoiceDate}
      studentName={enrollment.customerName || session.name}
      studentEmail={enrollment.customerEmail || session.email}
      courseName={enrollment.courseName}
      baseAmount={baseAmount}
      gstAmount={gstAmount}
      totalAmount={enrollment.amount}
      igstRate={igstRate}
      razorpayPaymentId={paymentId}
      razorpayOrderId={enrollment.razorpayOrderId}
    />
  )
}
