"use client"

import { useState } from "react"
import { ArrowLeft, Printer, Loader2 } from "lucide-react"
import Link from "next/link"

interface Props {
  invoiceNo: string
  invoiceDate: string
  studentName: string
  studentEmail: string
  courseName: string
  baseAmount: number
  gstAmount: number
  totalAmount: number
  igstRate: number
  razorpayPaymentId: string
  razorpayOrderId: string
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(n)

export default function InvoiceClient({
  invoiceNo, invoiceDate, studentName, studentEmail, courseName,
  baseAmount, gstAmount, totalAmount, igstRate, razorpayPaymentId, razorpayOrderId,
}: Props) {
  const [printing, setPrinting] = useState(false)

  const handlePrint = () => {
    if (printing) return
    setPrinting(true)
    window.print()
    setTimeout(() => setPrinting(false), 1500)
  }

  return (
    <div className="print-area min-h-screen bg-[var(--bg-deep)]">
      {/* Controls */}
      <div className="print:hidden max-w-3xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-(--text) transition-colors">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            disabled={printing}
            className="shimmer-btn flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {printing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4" />}
            {printing ? "Preparing..." : "Print / Download PDF"}
          </button>
        </div>
      </div>

      {/* Invoice */}
      <div className="max-w-3xl mx-auto px-4 pb-16 print:px-0 print:pb-0">
        <div className="bg-white text-gray-900 rounded-2xl overflow-hidden shadow-2xl print:rounded-none print:shadow-none">
          {/* Header */}
          <div className="invoice-header bg-[var(--bg-alt)] px-5 sm:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-start justify-between gap-6 print:border-b print:border-gray-200">
            <div>
              <h1 className="invoice-header-title text-(--text) text-2xl font-bold mb-0.5" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                MHW Consultancy
              </h1>
              <p className="invoice-header-sub text-[var(--text-muted)] text-xs">Professional Education & Training</p>
              <p className="invoice-header-sub text-[var(--text-muted)] text-xs mt-1">info@mhwconsultancy.in · +91 88026 60308</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="invoice-header-sub text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Tax Invoice</p>
              <p className="invoice-header-title text-(--text) font-bold text-lg">{invoiceNo}</p>
              <p className="invoice-header-sub text-[var(--text-muted)] text-xs mt-1">{invoiceDate}</p>
            </div>
          </div>

          <div className="px-5 sm:px-10 py-8">
            {/* Billed to */}
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Billed To</p>
                <p className="font-semibold text-gray-900">{studentName}</p>
                <p className="text-sm text-gray-600 break-all">{studentEmail}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Payment Info</p>
                <p className="text-sm text-gray-600">Razorpay · Online</p>
                <p className="text-xs text-gray-400 font-mono mt-1 break-all">{razorpayPaymentId}</p>
              </div>
            </div>

            {/* Line items */}
            <div className="overflow-x-auto -mx-5 sm:mx-0 mb-8">
              <table className="w-full min-w-[480px] sm:min-w-0 px-5 sm:px-0">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pl-5 sm:pl-0">Description</th>
                    <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">HSN/SAC</th>
                    <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-5 sm:pr-0">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 pl-5 sm:pl-0">
                      <p className="font-medium text-gray-900">{courseName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Online professional training programme — lifetime access</p>
                    </td>
                    <td className="py-4 text-right text-sm text-gray-600 whitespace-nowrap">998313</td>
                    <td className="py-4 text-right font-medium text-gray-900 pr-5 sm:pr-0 whitespace-nowrap">{fmt(baseAmount)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-full sm:w-64 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal (excl. GST)</span>
                  <span>{fmt(baseAmount)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>IGST @ {igstRate}% (SAC 998313)</span>
                  <span>{fmt(gstAmount)}</span>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between font-bold text-gray-900 text-base">
                  <span>Total</span>
                  <span>{fmt(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Amount paid</span>
                  <span className="text-green-600 font-semibold">{fmt(totalAmount)} ✓</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-gray-50 rounded-xl p-5 text-xs text-gray-500 space-y-1">
              <p><span className="font-semibold text-gray-700">Note:</span> This is a computer-generated invoice and does not require a signature.</p>
              <p>GST is charged under the Integrated GST Act (IGST) as this is an online digital service.</p>
              <p>HSN/SAC code 998313 — Online education and training services.</p>
              <p className="font-mono text-gray-400 pt-1 break-all">Order ID: {razorpayOrderId}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-5 sm:px-10 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 border-t border-gray-200">
            <p className="text-xs text-gray-400">Thank you for learning with MHW Consultancy.</p>
            <p className="text-xs text-gray-400">{invoiceNo}</p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page { margin: 0; size: auto; }
          body { background: white; }
          .print\\:hidden { display: none !important; }
          .invoice-header { background: none !important; flex-direction: row !important; align-items: flex-start !important; }
          .invoice-header-title { color: #111827 !important; }
          .invoice-header-sub { color: #6b7280 !important; }
          .invoice-header > div:last-child { text-align: right !important; }
        }
      `}</style>
    </div>
  )
}
