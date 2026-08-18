// src/components/receipt/ReceiptModal.jsx
import { useRef, useState } from "react"
import { X, Printer, FileDown, Share2, Send } from "lucide-react"
import { useReactToPrint } from "react-to-print"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { ReceiptCard } from "../../pages/Receipt" // Import ReceiptCard instead of default page

export default function ReceiptModal({ order, onClose }) {
  const printRef = useRef(null)
  const [loading, setLoading] = useState(null) 

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `receipt-${order.orderId}`,
  })

const handleSavePdf = async () => {
  if (!printRef.current) return
  setLoading("pdf")
  try {
    const margin = 10
    const canvas = await html2canvas(printRef.current, { scale: 2 })
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")

    const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2
    const pageHeight = pdf.internal.pageSize.getHeight() - margin * 2
    const imgWidth = pageWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    let heightLeft = imgHeight
    let position = margin

    pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + margin
      pdf.addPage()
      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save(`receipt-${orderId}.pdf`)
  } catch (err) {
    console.error("PDF generation failed:", err)
  } finally {
    setLoading(null)
  }
}

  const handleShare = async () => {
    setLoading("share")
    const text = `វិក្កយបត្រ ${order.orderId}\nសរុប: $${order.total.toFixed(2)}\nអតិថិជន: ${order.customerName}`
    try {
      if (navigator.share) {
        await navigator.share({ title: "វិក្កយបត្រ", text })
      } else {
        await navigator.clipboard.writeText(text)
        alert("Browser មិន support share ទេ — ចម្លងទៅ clipboard ជំនួសវិញ")
      }
    } catch (err) {
      // user cancelled
    } finally {
      setLoading(null)
    }
  }

  const handleSendTelegram = async () => {
    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      alert("សូមកំណត់ VITE_TELEGRAM_BOT_TOKEN និង VITE_TELEGRAM_CHAT_ID ក្នុងឯកសារ .env")
      return
    }

    setLoading("telegram")
    try {
      const text =
        `🧾 វិក្កយបត្រ ${order.orderId}\n` +
        `👤 ${order.customerName} (${order.phone})\n` +
        `📍 ${order.address}\n` +
        `🚚 ${order.deliveryMethod}  |  💳 ${order.paymentMethod}\n` +
        `------------------------\n` +
        order.items.map((i) => `${i.name} × ${i.quantity} — $${(i.price * i.quantity).toFixed(2)}`).join("\n") +
        `\n------------------------\n` +
        `💰 សរុប: $${order.total.toFixed(2)}`

      const res = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
        }
      )

      if (!res.ok) throw new Error("Telegram API returned an error")
      alert("បានផ្ញើវិក្កយបត្រទៅ Telegram ✅")
    } catch (err) {
      console.error(err)
      alert("មិនអាចផ្ញើទៅ Telegram បានទេ")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <h2 className="font-bold text-slate-900">វិក្កយបត្រ</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {/* Receipt content wrapper bound to printRef */}
        <div className="overflow-y-auto py-4" ref={printRef}>
          <ReceiptCard order={order} />
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 p-2 border-t border-slate-100 shrink-0">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 bg-red-900 text-white font-medium py-1 rounded-full hover:bg-red-800 transition-colors"
          >
            <Printer size={16} />
            Print
          </button>

          <button
            onClick={handleSavePdf}
            disabled={loading === "pdf"}
            className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-medium py-1 rounded-full hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <FileDown size={16} />
            {loading === "pdf" ? "កំពុងរក្សា..." : "Save PDF"}
          </button>

          <button
            onClick={handleShare}
            disabled={loading === "share"}
            className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-medium py-2.5 rounded-full hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <Share2 size={16} />
            Share
          </button>

          <button
            onClick={handleSendTelegram}
            disabled={loading === "telegram"}
            className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-medium py-2.5 rounded-full hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <Send size={16} />
            {loading === "telegram" ? "កំពុងផ្ញើ..." : "Telegram"}
          </button>
        </div>
      </div>
    </div>
  )
}