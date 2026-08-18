import { useRef, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Printer, FileDown, Share2, Send } from "lucide-react"
import { useReactToPrint } from "react-to-print"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

// Shared Receipt Card component used by both the modal and standalone page
export function ReceiptCard({ order }) {
  const {
    orderId,
    date,
    customerName,
    phone,
    address,
    deliveryMethod,
    paymentMethod,
    items,
    subtotal,
    deliveryFee,
    total,
    note,
  } = order

  return (
    // បន្ថែម pb-8 ដើម្បីការពារកុំឱ្យដាច់ item ពេលចាប់យករូបភាព
    <div className="bg-white text-slate-900 p-6 pb-8 w-full max-w-sm mx-auto font-mono text-sm">
      <div className="text-center border-b border-dashed border-slate-300 pb-4 mb-4">
        <h2 className="font-bold text-lg tracking-wide">ONE CARE SHOP</h2>
        <p className="text-xs text-slate-500 mt-1">ភ្នំពេញ, កម្ពុជា</p>
        <p className="text-xs text-slate-500">+855 88 66 77 456</p>
      </div>

      <div className="text-xs space-y-1 mb-4">
        <div className="flex justify-between">
          <span className="text-slate-500">លេខបញ្ជាទិញ</span>
          <span className="font-semibold">{orderId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">កាលបរិច្ឆេទ</span>
          <span>{date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">អតិថិជន</span>
          <span>{customerName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">ទូរស័ព្ទ</span>
          <span>{phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">អាសយដ្ឋាន</span>
          <span className="text-right max-w-[60%]">{address}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">សេវាដឹកជញ្ជូន</span>
          <span>{deliveryMethod}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">វិធីបង់ប្រាក់</span>
          <span>{paymentMethod}</span>
        </div>
        {note && (
          <div className="flex justify-between">
            <span className="text-slate-500">ចំណាំ</span>
            <span className="text-right max-w-[60%]">{note}</span>
          </div>
        )}
      </div>

      <div className="border-t border-dashed border-slate-300 pt-3 pb-2">
        {items.map((item) => {
          const price = Number(item.price) || 0
          const quantity = Number(item.quantity) || 0
          return (
            <div key={item.id} className="flex justify-between items-start mb-2">
              <span className="truncate pr-2 text-xs leading-relaxed">
                {item.name} × {quantity}
              </span>
              <span className="shrink-0 text-xs font-medium">${(price * quantity).toFixed(2)}</span>
            </div>
          )
        })}
      </div>

      <div className="border-t border-dashed border-slate-300 mt-3 pt-3 space-y-1">
        <div className="flex justify-between text-slate-600 text-xs">
          <span>តម្លៃផលិតផលសរុប</span>
          <span>${(Number(subtotal) || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-600 text-xs">
          <span>ថ្លៃដឹកជញ្ជូន</span>
          <span>${(Number(deliveryFee) || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-sm border-t border-slate-300 pt-2 mt-2">
          <span>សរុប</span>
          <span>${(Number(total) || 0).toFixed(2)}</span>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-6">
        សូមអរគុណសម្រាប់ការទិញទំនិញ!
      </p>
    </div>
  )
}

export default function Receipt() {
  const { orderId } = useParams()
  const printRef = useRef(null)
  const [loading, setLoading] = useState(null)

  let order = null
  try {
    const raw = localStorage.getItem(`receipt-${orderId}`)
    order = raw ? JSON.parse(raw) : null
  } catch (err) {
    order = null
  }

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `receipt-${orderId}`,
  })

  // កែប្រែ handleSavePdf ឱ្យ Save PDF ចំកណ្តាលក្រដាស A4 ស្អាត
  const handleSavePdf = async () => {
    if (!printRef.current) return
    setLoading("pdf")
    try {
      const canvas = await html2canvas(printRef.current, { 
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: printRef.current.scrollWidth
      })
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // កំណត់ទំហំទទឹងវិក្កយបត្រលើ PDF ត្រឹម 90mm ដើម្បីឱ្យនៅចំកណ្តាលស្អាតមិនធំពេក
      const imgWidth = 90
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // គណនាកូអរដោនែ X និង Y ให้อยู่ចំកណ្តាល (Center)
      const xCoord = (pageWidth - imgWidth) / 2
      const yCoord = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : 10

      pdf.addImage(imgData, "PNG", xCoord, yCoord, imgWidth, imgHeight)
      pdf.save(`receipt-${orderId}.pdf`)
    } catch (err) {
      console.error("PDF generation failed:", err)
    } finally {
      setLoading(null)
    }
  }

  const handleShare = async () => {
    setLoading("share")
    const text = `វិក្កយបត្រ ${order.orderId}\nសរុប: $${(Number(order.total) || 0).toFixed(2)}\nអតិថិជន: ${order.customerName}`
    try {
      if (navigator.share) {
        await navigator.share({ title: "វិក្កយបត្រ", text })
      } else {
        await navigator.clipboard.writeText(text)
        alert("Browser មិន support share ទេ — ចម្លងទៅ clipboard ជំនួសវិញ")
      }
    } catch (err) {
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
        order.items
          .map((i) => `${i.name} × ${i.quantity} — $${(Number(i.price) * Number(i.quantity)).toFixed(2)}`)
          .join("\n") +
        `\n------------------------\n` +
        `💰 សរុប: $${(Number(order.total) || 0).toFixed(2)}`

      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      })

      if (!res.ok) throw new Error("Telegram API returned an error")
      alert("បានផ្ញើវិក្កយបត្រទៅ Telegram ✅")
    } catch (err) {
      console.error(err)
      alert("មិនអាចផ្ញើទៅ Telegram បានទេ")
    } finally {
      setLoading(null)
    }
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10 text-center max-w-md w-full">
          <p className="text-slate-500">រកមិនឃើញវិក្កយបត្រនេះទេ។</p>
          <Link to="/" className="text-red-700 font-medium mt-4 inline-block">
            ត្រឡប់ទៅទំព័រដើម
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-md mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-red-700 mb-4"
        >
          <ArrowLeft size={16} />
          ត្រឡប់ទៅទំព័រដើម
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div ref={printRef} className="py-4 bg-white flex justify-center">
            <ReceiptCard order={order} />
          </div>

          <div className="grid grid-cols-2 gap-2 p-2 border-t border-slate-100">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 bg-red-900 text-white font-medium py-2 rounded-full hover:bg-red-800 transition-colors"
            >
              <Printer size={16} />
              Print
            </button>

            <button
              onClick={handleSavePdf}
              disabled={loading === "pdf"}
              className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-medium py-2 rounded-full hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <FileDown size={16} />
              {loading === "pdf" ? "កំពុងរក្សា..." : "Save PDF"}
            </button>

            <button
              onClick={handleShare}
              disabled={loading === "share"}
              className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-medium py-2 rounded-full hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <Share2 size={16} />
              Share
            </button>

            <button
              onClick={handleSendTelegram}
              disabled={loading === "telegram"}
              className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-medium py-2 rounded-full hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <Send size={16} />
              {loading === "telegram" ? "កំពុងផ្ញើ..." : "Telegram"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}