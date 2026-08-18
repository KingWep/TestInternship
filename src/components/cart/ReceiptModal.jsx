// components/cart/ReceiptModal.jsx

import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { X, Printer, FileDown, CheckCircle2, ShoppingBag, Calendar, Phone, MapPin, FileText } from "lucide-react"
import { useReactToPrint } from "react-to-print"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export default function ReceiptModal({
  order,
  onClose
}) {
  const receiptRef = useRef(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    navigate("/")
  }

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: `Receipt-${order?.id || "order"}`,
  })

  const handleDownloadPdf = async () => {
    if (!receiptRef.current) return

    try {
      setLoading(true)

      const canvas = await html2canvas(
        receiptRef.current,
        {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        }
      )

      const imgData = canvas.toDataURL("image/png")

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const imgWidth = pageWidth - 20
      const imgHeight =
        (canvas.height * imgWidth) / canvas.width

      pdf.addImage(
        imgData,
        "PNG",
        10,
        10,
        imgWidth,
        imgHeight
      )

      pdf.save(
        `Receipt-${order?.id || "order"}.pdf`
      )
    } catch (error) {
      console.error(
        "Failed to generate PDF:",
        error
      )
    } finally {
      setLoading(false)
    }
  }

  if (!order) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">

      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-600 shadow-sm">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Order Receipt
              </h2>
              <p className="text-xs font-medium text-slate-500">
                Transaction reference #{order.id || "NEW"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 shadow-sm cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-100/70 p-6">

          <div
            ref={receiptRef}
            className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 text-slate-900 shadow-lg border border-slate-100"
          >

            {/* Store Branding */}
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-900 text-white font-black text-xl mb-3 shadow-md shadow-red-900/20">
                One
              </div>
              <h1 className="text-xl font-black tracking-wider text-slate-900">
                One Care Shop
              </h1>
              <p className="mt-0.5 text-xs font-medium text-slate-400">
                Your trusted online store experience
              </p>

              <div className="my-5 border-b border-dashed border-slate-200" />
            </div>

            {/* Order Info */}
            <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50/70 p-3.5 text-xs border border-slate-100">
              <div className="flex items-center gap-2">
                <FileText size={15} className="text-slate-400 shrink-0" />
                <div>
                  <p className="text-slate-400 font-medium">Order ID</p>
                  <p className="font-bold text-slate-700">#{order.id || "NEW"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-slate-400 shrink-0" />
                <div>
                  <p className="text-slate-400 font-medium">Date & Time</p>
                  <p className="font-bold text-slate-700">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer */}
            <div className="mt-5 border-t border-slate-100 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Customer Details
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Phone size={14} className="text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-800">{order.phone}</span>
                </div>

                <div className="flex items-start gap-2.5 text-slate-600">
                  <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-800 leading-relaxed">{order.address}</span>
                </div>

                {order.note && (
                  <div className="rounded-lg bg-amber-50/60 border border-amber-100 p-2.5 text-amber-900 mt-2">
                    <span className="font-semibold">Note:</span> {order.note}
                  </div>
                )}
              </div>
            </div>

            {/* Items */}
            <div className="mt-6 border-t border-slate-100 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Purchased Items
              </h3>

              <div className="space-y-3">
                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 text-sm py-1 border-b border-slate-50 last:border-0"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 text-xs">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                      </p>
                    </div>

                    <p className="font-bold text-slate-800 text-xs">
                      ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 border-t border-dashed border-slate-200 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-medium text-slate-700">${Number(order.subtotal).toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-slate-500">
                <span>Delivery Fee</span>
                <span className="font-medium text-slate-700">${Number(order.deliveryFee).toFixed(2)}</span>
              </div>

              <div className="mt-3 border-t border-slate-100 pt-3">
                <div className="flex justify-between items-center text-base font-bold">
                  <span className="text-slate-900">Total Amount</span>
                  <span className="text-red-900 bg-red-50 px-2.5 py-1 rounded-lg">
                    ${Number(order.total).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment & Delivery Badges */}
            <div className="mt-6 grid grid-cols-2 gap-2.5 rounded-xl bg-slate-50 p-3 text-xs border border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px] font-medium uppercase tracking-wider">Payment</span>
                <span className="font-bold text-slate-800 uppercase mt-0.5 block">
                  {order.paymentMethod}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-medium uppercase tracking-wider">Fulfillment</span>
                <span className="font-bold text-slate-800 uppercase mt-0.5 block">
                  {order.deliveryMethod}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center border-t border-slate-100 pt-4">
              <div className="inline-flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                <CheckCircle2 size={13} /> Verified Transaction
              </div>
              <p className="text-xs font-semibold text-slate-700">
                Thank you for your order! ❤️
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Please retain this receipt for your records.
              </p>
            </div>

          </div>
        </div>
        <div className="flex shrink-0 gap-3 border-t border-slate-100 bg-white p-4 px-6 shadow-lg">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-2xl border border-slate-200 py-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50 active:scale-[0.98] cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 active:scale-[0.98] cursor-pointer"
          >
            <FileDown size={16} />
            {loading ? "Generating..." : "Save PDF"}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-900 py-3 text-xs font-bold text-white shadow-lg shadow-red-900/20 transition hover:bg-red-800 active:scale-[0.98] cursor-pointer"
          >
            <Printer size={16} />
            Print Receipt
          </button>
        </div>

      </div>
    </div>
  )
}