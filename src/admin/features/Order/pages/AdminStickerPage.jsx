import React, { useRef, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Printer, FileDown, Send, ShoppingBag, Phone,
  User, MapPin, Tag, Bike, Receipt, ArrowLeft,
  Loader2
} from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
import { toPng } from 'html-to-image'
import { useOrderContext } from '../../../../context/OrderContext'

function AdminStickerCard({ order, courier, setCourier }) {
  const subtotal = Number(order?.subtotal) || 0
  const delivery = Number(order?.delivery) || 0
  const total = Number(order?.total) || 0

  const couriers = ['វីរៈប៊ុនថាំ', 'J&T Express', 'កាពីតូល', 'ផ្សេងៗ']

  return (
    <div
      id="admin-sticker-card"
      style={{
        width: '580px',
        minHeight: '385px',
        fontFamily: "'Kantumruy Pro', 'Siemreap', 'Battambang', 'Noto Sans Khmer', sans-serif",
        boxSizing: 'border-box',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility'
      }}
      className="bg-white border-2 border-slate-900 rounded-xl p-4 text-slate-900 select-none mx-auto flex flex-col justify-between"
    >
      <div className="flex items-center justify-between pb-2.5 border-b-2 border-slate-900">
        <div className="flex items-center gap-2.5">
          <div className="bg-slate-900 text-white p-2 rounded-lg flex items-center justify-center">
            <ShoppingBag size={20} strokeWidth={2.5} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-600 block leading-tight">ប័ណ្ណដឹកជញ្ជូនទំនិញ</span>
            <h1 className="font-black text-xl tracking-wider text-slate-900 leading-none">ONE STORE</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-300">
          <div className="flex items-center gap-1.5">
            <Phone size={13} className="text-slate-900" />
            <span>088 999 9999</span>
          </div>
          <span className="text-slate-400">|</span>
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-slate-900">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            <span>One Store</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2.5 my-2.5 flex-1 items-stretch">

        <div className="col-span-7 flex flex-col gap-2 justify-between">
          <div className="grid grid-cols-2 gap-2">
            <div className="border border-slate-800 rounded-lg p-2.5 bg-slate-50/60 flex flex-col justify-center">
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600 mb-1">
                <User size={12} /> អ្នកផ្ញើ :
              </div>
              <p className="font-bold text-xs text-slate-900 truncate">John Wick</p>
              <p className="text-[11px] text-slate-700 font-semibold">096 123 9999</p>
            </div>

            <div className="border border-slate-800 rounded-lg p-2.5 bg-slate-50/60 flex flex-col justify-center">
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600 mb-1">
                <Phone size={12} /> អ្នកទទួល :
              </div>
              <p className="font-bold text-xs text-slate-900 truncate">{order?.customerName || 'អតិថិជនទូទៅ'}</p>
              <p className="text-[11px] font-bold text-slate-900 tracking-wide">{order?.phone || '—'}</p>
            </div>
          </div>

          <div className="border border-slate-800 rounded-lg p-2.5 flex-1 flex flex-col justify-start bg-white">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 mb-1">
              <MapPin size={13} className="text-slate-900" /> អាស័យដ្ឋានដឹកជញ្ជូន :
            </div>
            <p className="font-bold text-xs text-slate-900 leading-relaxed line-clamp-3">
              {order?.address || 'មិនមានអាសយដ្ឋាន'}
            </p>
          </div>
        </div>

        {/* Right Side: KHQR & Pricing Breakdown */}
        <div className="col-span-5 flex flex-col gap-2 justify-between">
          <div className="border border-slate-800 rounded-lg overflow-hidden flex flex-col items-center bg-white">
            <div className="w-full bg-slate-900 text-white text-center py-1 text-[10px] font-black tracking-widest uppercase">
              KHQR PAYMENT
            </div>
            <div className="p-2 flex items-center justify-center bg-white">
              <img
                src="/images/qrbank.JPG"
                alt="KHQR QR Code"
                className="w-16 h-16 object-contain"
                crossOrigin="anonymous"
              />
            </div>
            <div className="w-full text-center border-t border-slate-200 py-1 text-[10px] font-bold text-slate-800 uppercase bg-slate-50">
              LENG CHANTHA
            </div>
          </div>

          <div className="border border-slate-800 rounded-lg p-2.5 bg-slate-50/60 flex flex-col justify-center gap-1.5 text-xs">
            <div className="flex justify-between items-center text-slate-700 text-[11px]">
              <span className="flex items-center gap-1 font-bold"><Tag size={12} /> ទំនិញ:</span>
              <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 text-[11px]">
              <span className="flex items-center gap-1 font-bold"><Bike size={12} /> ដឹកជញ្ជូន:</span>
              <span className="font-bold text-slate-900">${delivery.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-slate-300 text-slate-950 font-black text-xs">
              <span className="flex items-center gap-1"><Receipt size={13} /> សរុប:</span>
              <span className="text-sm font-black text-slate-950">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>


      <div className="flex items-center justify-between pt-2 border-t-2 border-slate-900 text-xs">
        <div className="flex items-center gap-2">
          {couriers.map((c) => {
            const isSelected = courier === c
            return (
              <button
                type="button"
                key={c}
                onClick={() => setCourier(c)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded border transition-all text-[11px] font-bold ${isSelected
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                  }`}
              >
                <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${isSelected ? 'border-white bg-white' : 'border-slate-400'}`}>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />}
                </div>
                <span>{c}</span>
              </button>
            )
          })}
        </div>
        <p className="text-xs font-black tracking-wide text-slate-900">
          សូមអរគុណ! 🙏
        </p>
      </div>
    </div>
  )
}


export default function AdminStickerPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { orders } = useOrderContext()
  const order = orders?.find((o) => o.id === id || o.orderNumber === id)

  const printRef = useRef(null)
  const [loading, setLoading] = useState(null)
  const [courier, setCourier] = useState('វីរៈប៊ុនថាំ')

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-base font-semibold text-slate-600 mb-4">រកមិនឃើញទិន្នន័យប័ណ្ណដឹកជញ្ជូននេះទេ</p>
        <Link to="/admin/orders" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 bg-white px-3.5 py-1.5 rounded-lg shadow-xs border border-slate-200 text-sm font-medium transition-colors">
          <ArrowLeft size={16} />
          <span>ត្រលប់ក្រោយ</span>
        </Link>
      </div>
    )
  }

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Sticker-ORD-${order.orderNumber || order.id}`,
    pageStyle: `
      @page { 
        size: 150mm 100mm landscape; 
        margin: 0; 
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
        #admin-sticker-card {
          margin: auto !important;
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
      link.download = `Sticker-ORD-${order.orderNumber || order.id}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Export failed:', err)
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
      const text =
        `📦 <b>ប័ណ្ណដឹកជញ្ជូន — ORD:${order.orderNumber || order.id}</b>\n\n` +
        `👤 <b>អតិថិជន:</b> ${order.customerName || '—'}\n` +
        `📲 <b>លេខទូរស័ព្ទ:</b> ${order.phone || '—'}\n` +
        `📍 <b>អាសយដ្ឋាន:</b> ${order.address || '—'}\n` +
        `💰 <b>សរុប:</b> $${(Number(order.total) || 0).toFixed(2)}` +
        (courier ? `\n🚚 <b>សេវាដឹក:</b> ${courier}` : '')

      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
      })
      if (!res.ok) throw new Error('Telegram API error')
      alert('បានផ្ញើទៅ Telegram ដោយជោគជ័យ ✅')
    } catch (err) {
      console.error(err)
      alert('មិនអាចផ្ញើទៅ Telegram បានទេ')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-8 px-4 font-sans text-slate-800">

      <div className="w-full max-w-2xl flex items-center justify-between mb-5">
        <Link to="/admin/orders" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 bg-white px-3.5 py-1.5 rounded-lg shadow-xs border border-slate-200 text-sm font-medium transition-colors">
          <ArrowLeft size={16} />
          <span>ត្រលប់ក្រោយ</span>
        </Link>
        <span className="text-xs font-bold text-slate-500 bg-slate-200/70 px-2.5 py-1 rounded-full">
          ទំហំស្ទីឃ័រ: 150mm × 100mm
        </span>
      </div>


      <div className="bg-white p-4 shadow-lg rounded-2xl mb-6 border border-slate-200">
        <div ref={printRef} className="flex justify-center items-center w-full">
          <AdminStickerCard order={order} courier={courier} setCourier={setCourier} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all text-sm font-semibold shadow-sm"
        >
          <Printer size={16} />
          បោះពុម្ពស្ទីឃ័រ
        </button>

        <button
          onClick={handleSaveImage}
          disabled={loading === 'img'}
          className="flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-5 py-2.5 rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all text-sm font-semibold shadow-xs disabled:opacity-60"
        >
          {loading === 'img' ? <Loader2 size={16} className="animate-spin text-slate-500" /> : <FileDown size={16} />}
          {loading === 'img' ? 'កំពុងរក្សាទុក...' : 'ទាញយករូបភាព'}
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