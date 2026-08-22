import React, { useRef, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Printer, FileDown, Send, ArrowLeft, Loader2} from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
import { toPng } from 'html-to-image'
import { useOrderContext } from '../../../../context/OrderContext'

function AdminReceiptCard({ order }) {
  const subtotal = Number(order?.subtotal) || 0
  const delivery = Number(order?.delivery) || 0
  const total    = Number(order?.total)    || 0

  return (
    <div
      id="admin-receipt-card"
      style={{ 
        width: '350px',
        fontFamily: "'Kantumruy Pro', 'Siemreap', 'Battambang', 'Noto Sans Khmer', sans-serif",
        boxSizing: 'border-box',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility'
      }}
      className="bg-white text-slate-900 mx-auto text-xs px-6 py-6 shadow-sm border border-slate-900 rounded-xl overflow-hidden flex flex-col"
    >

      <div className="text-center border-b border-dashed border-slate-800 pb-3 mb-3 w-full">
        <h2 className="font-black text-base tracking-wider uppercase text-slate-900 leading-tight">ONE CARE SHOP</h2>
        <p className="text-[11px] text-slate-900 mt-1">ទូរស័ព្ទ: 088 66 77 456</p>
        <p className="text-[11px] text-slate-900">ភ្នំពេញ, កម្ពុជា</p>
      </div>

      <div className="text-[11px] space-y-1.5 mb-3 flex flex-col border-b border-dashed border-slate-800 pb-3 text-slate-700 w-full">
        <div className="flex justify-between items-center w-full">
          <span className="font-medium text-slate-900">លេខវិក្កយបត្រ:</span> 
          <span className="font-mono font-bold text-slate-900">ORD:{order?.orderNumber || order?.id}</span>
        </div>
        <div className="flex justify-between items-center w-full">
          <span className="font-medium text-slate-900">កាលបរិច្ឆេទ:</span> 
          <span className="font-mono text-slate-800">{order?.date} {order?.time}</span>
        </div>
        {order?.customerName && (
          <div className="flex justify-between items-center w-full">
            <span className="font-medium text-slate-900">អតិថិជន:</span> 
            <span className="font-bold text-slate-900 truncate max-w-[180px]">{order.customerName}</span>
          </div>
        )}
        <div className="flex justify-between items-center w-full">
          <span className="font-medium text-slate-900">លេខទូរស័ព្ទ:</span> 
          <span className="font-mono text-slate-900 font-semibold">{order?.phone || '—'}</span>
        </div>
      </div>

      <div className="mb-3 w-full border-b border-dashed border-slate-800 pb-3">
        <table className="w-full text-[11px] table-fixed border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-900 font-bold">
              <th className="text-left pb-1.5 font-bold w-[45%]">ទំនិញ</th>
              <th className="text-center pb-1.5 font-bold w-[15%]">ចំនួន</th>
              <th className="text-right pb-1.5 font-bold w-[20%]">តម្លៃ</th>
              <th className="text-right pb-1.5 font-bold w-[20%]">សរុប</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {order?.items && order.items.length > 0 ? (
              order.items.map((item, idx) => {
                const price = Number(item.price) || Number(item.salePrice) || 0
                const qty   = Number(item.quantity) || 0
                return (
                  <tr key={item.id ?? idx} className="text-slate-800">
                    <td className="py-1.5 pr-1 font-medium break-words text-left align-top leading-snug">
                      {item.name}
                    </td>
                    <td className="py-1.5 text-center tabular-nums text-slate-600 font-semibold align-top">
                      {qty}
                    </td>
                    <td className="py-1.5 text-right tabular-nums text-slate-600 align-top">
                      ${price.toFixed(2)}
                    </td>
                    <td className="py-1.5 text-right tabular-nums font-bold text-slate-900 align-top">
                      ${(price * qty).toFixed(2)}
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={4} className="py-3 text-center text-slate-400">
                  គ្មានទំនិញ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="space-y-1.5 pb-3 mb-3 border-b border-dashed border-slate-800 text-[11px] text-slate-700 w-full">
        <div className="flex justify-between items-center">
          <span className="text-slate-900">តម្លៃទំនិញសរុប (Subtotal):</span>
          <span className="tabular-nums font-medium text-slate-800">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-900">សេវាដឹកជញ្ជូន (Delivery):</span>
          <span className="tabular-nums font-medium text-slate-800">${delivery.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center pt-1.5 border-t border-slate-800 text-sm font-bold text-slate-900">
          <span>ទឹកប្រាក់សរុប (Total):</span>
          <span className="tabular-nums font-black text-slate-950">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="text-center space-y-0.5 pt-0.5 w-full">
        <p className="text-[11px] font-bold text-slate-900">
          អរគុណសម្រាប់ការគាំទ្រ! 🙏
        </p>
        <p className="text-[10px] text-slate-900 font-medium tracking-wide uppercase">Thank You! Please Come Again</p>
      </div>
    </div>
  )
}

export default function AdminReceiptPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { orders } = useOrderContext()
  const order = orders?.find((o) => o.id === id || o.orderNumber === id)

  const printRef = useRef(null)
  const [loading, setLoading] = useState(null)

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-base font-semibold text-slate-600 mb-4">រកមិនឃើញវិក្កយបត្រនេះទេ</p>
        <Link to="/admin/orders" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 bg-white px-3.5 py-1.5 rounded-lg shadow-xs border border-slate-800 text-sm font-medium transition-colors">
          <ArrowLeft size={16} />
          <span>ត្រលប់ក្រោយ</span>
        </Link>
      </div>
    )
  }

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Receipt-ORD-${order.orderNumber || order.id}`,
    pageStyle: `
      @page { 
        size: auto; 
        margin: 10mm; 
      }
      @media print { 
        html, body { 
          width: 100%;
          height: 100%;
          margin: 0 !important; 
          padding: 0 !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          -webkit-print-color-adjust: exact; 
          print-color-adjust: exact;
        }
        #admin-receipt-card {
          margin: auto !important;
          border: none !important;
          box-shadow: none !important;
        }
      }
    `,
  })

  const handleSaveImage = async () => {
    if (!printRef.current) return
    setLoading('img')
    try {
      await document.fonts.ready

      const dataUrl = await toPng(printRef.current, {
        cacheBust: true,
        pixelRatio: 4,
        backgroundColor: '#ffffff'
      })

      const link = document.createElement('a')
      link.download = `Receipt-ORD-${order.orderNumber || order.id}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Image export failed:', err)
      alert('មានបញ្ហាក្នុងការទាញយករូបភាព!')
    } finally {
      setLoading(null)
    }
  }

  const handleSendTelegram = async () => {
    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID
    if (!token || !chatId) {
      alert('សូមកំណត់ VITE_TELEGRAM_BOT_TOKEN និង VITE_TELEGRAM_CHAT_ID ក្នុងឯកសារ .env')
      return
    }
    setLoading('telegram')
    try {
      const lines = (order.items || [])
        .map((i) => {
          const p = Number(i.price) || Number(i.salePrice) || 0
          const q = Number(i.quantity) || 0
          return `• ${i.name} × ${q} — $${(p * q).toFixed(2)}`
        })
        .join('\n')

      const text =
        `🧾 <b>វិក្កយបត្រ — ORD:${order.orderNumber || order.id}</b>\n\n` +
        `👤 <b>អតិថិជន:</b> ${order.customerName || '—'}\n` +
        `📲 <b>លេខទូរស័ព្ទ:</b> ${order.phone || '—'}\n` +
        `📍 <b>អាសយដ្ឋាន:</b> ${order.address || '—'}\n` +
        `📅 <b>កាលបរិច្ឆេទ:</b> ${order.date} ${order.time}\n` +
        `------------------------\n${lines}\n` +
        `------------------------\n` +
        `🔹 <b>Subtotal:</b> $${(Number(order.subtotal) || 0).toFixed(2)}\n` +
        `🚚 <b>Delivery:</b> $${(Number(order.delivery) || 0).toFixed(2)}\n` +
        `💰 <b>Total:</b> $${(Number(order.total) || 0).toFixed(2)}`

      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
      })
      if (!res.ok) throw new Error('Telegram API error')
      alert('បានផ្ញើវិក្កយបត្រទៅ Telegram ដោយជោគជ័យ ✅')
    } catch (err) {
      console.error(err)
      alert('មិនអាចផ្ញើទៅ Telegram បានទេ')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-8 px-4 font-sans text-slate-800">
     
      <div className="w-full max-w-xl flex items-center justify-between mb-5">
        <Link to="/admin/orders" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 bg-white px-3.5 py-1.5 rounded-lg shadow-xs border border-slate-800 text-sm font-medium transition-colors">
          <ArrowLeft size={16} />
          <span>ត្រលប់ក្រោយ</span>
        </Link>
        <span className="text-xs font-bold text-slate-900 bg-slate-200/70 px-2.5 py-1 rounded">
          ទម្រង់វិក្ក័យបត្រ (Receipt)
        </span>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-2xl mb-6 border border-slate-800/80 flex items-center justify-center">
        <div ref={printRef} className="bg-white inline-block">
          <AdminReceiptCard order={order} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all text-sm font-semibold shadow-sm"
        >
          <Printer size={16} />
          បោះពុម្ពវិក្កយបត្រ
        </button>

        <button
          onClick={handleSaveImage}
          disabled={loading === 'img'}
          className="flex items-center gap-2 bg-white text-slate-700 border border-slate-800 px-5 py-2.5 rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all text-sm font-semibold shadow-xs disabled:opacity-60"
        >
          {loading === 'img' ? <Loader2 size={16} className="animate-spin text-slate-900" /> : <FileDown size={16} />}
          {loading === 'img' ? 'កំពុងរក្សាទុក...' : 'ទាញយករូបភាព PNG'}
        </button>

        <button
          onClick={handleSendTelegram}
          disabled={loading === 'telegram'}
          className="flex items-center gap-2 bg-sky-600 text-white px-5 py-2.5 rounded-xl hover:bg-sky-500 active:scale-[0.98] transition-all text-sm font-semibold shadow-xs disabled:opacity-60"
        >
          {loading === 'telegram' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {loading === 'telegram' ? 'កំពុងផ្ញើ...' : 'ផ្ញើទៅ Telegram'}
        </button>
      </div>
    </div>
  )
}