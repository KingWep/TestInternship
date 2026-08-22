// import { useRef, useState } from 'react'
// import { X, Printer, FileDown, Send, ShoppingBag, Phone, Facebook, User, MapPin, Tag, Bike, Receipt } from 'lucide-react'
// import { useReactToPrint } from 'react-to-print'
// import html2canvas from 'html2canvas'

// // ── Printable Sticker Card (150×100 mm landscape) ─────────────────────────────
// function AdminStickerCard({ order, courier, setCourier }) {
//   const subtotal = Number(order.subtotal) || 0
//   const delivery = Number(order.delivery) || 0
//   const total    = Number(order.total)    || 0

//   const couriers = ['វីរៈប៊ុនថាំ', 'J&T', 'កាពីតូល']

//   return (
//     <div
//       id="admin-sticker-card"
//       style={{ width: '560px', fontFamily: "'Noto Sans Khmer', 'Khmer OS', sans-serif" }}
//       className="bg-white border-[3px] border-black rounded-2xl p-3 text-black text-sm select-none mx-auto flex flex-col"
//     >
//       {/* ── Top Header Bar ── */}
//       <div className="flex items-center justify-between pb-2 border-b-[3px] border-black mb-2">
//         <div className="flex items-center gap-2">
//           <ShoppingBag size={28} className="fill-black text-black" strokeWidth={1} />
//           <div className="leading-none">
//             <h2 className="font-bold text-[15px] mb-0.5">ប័ណ្ណដឹកជញ្ជូន</h2>
//             <h1 className="font-black text-xl uppercase tracking-widest">NHA RUBY</h1>
//           </div>
//         </div>
//         <div className="flex items-center gap-4 font-bold text-[15px]">
//           <div className="flex items-center gap-1.5">
//             <Phone size={16} className="fill-black text-black" strokeWidth={1} /> 
//             0886677456
//           </div>
//           <div className="flex items-center gap-1.5">
//             <Facebook size={16} className="fill-black text-black" strokeWidth={1} /> 
//             Nha Ruby
//           </div>
//         </div>
//       </div>

//       {/* ── Main Body ── */}
//       <div className="flex gap-2 mb-2">

//         {/* Left — Customer Info */}
//         <div className="flex-1 flex flex-col gap-1.5">
//           {/* Shop Phone */}
//           <div className="border-[2px] border-black rounded-md px-2 py-1 h-[42px] flex flex-col justify-center">
//             <div className="flex items-center gap-1.5 text-xs font-bold">
//               <User size={13} className="fill-black text-black" strokeWidth={1}/> អ្នកផ្ញើ :
//             </div>
//             <p className="font-bold text-sm pl-5 leading-tight">088 667 7456</p>
//           </div>

//           {/* Customer Info Box (កម្ពស់ 60px ដើម្បីកុំឱ្យរុញ Layout) */}
//           <div className="border-[2px] border-black rounded-md px-2 py-1 h-[60px] flex flex-col justify-center">
//             <div className="flex items-center gap-1.5 text-xs font-bold">
//               <Phone size={13} className="fill-black text-black" strokeWidth={1}/> អ្នកទទួល :
//             </div>
//             <p className="font-bold text-xs pl-5 leading-tight truncate text-slate-800">
//               {order.customerName || 'អតិថិជនទូទៅ'}
//             </p>
//             <p className="font-bold text-sm pl-5 leading-tight">{order.phone || '—'}</p>
//           </div>

//           {/* Address Box (កម្ពស់ 86px ស្មើបាតជាមួយខាងស្តាំ) */}
//           <div className="border-[2px] border-black rounded-md px-2 py-1 h-[86px] flex flex-col">
//             <div className="flex items-center gap-1.5 text-xs font-bold mb-0.5">
//               <MapPin size={13} className="fill-black text-black" strokeWidth={1}/> ទីតាំង :
//             </div>
//             <p className="font-bold text-xs pl-5 leading-snug line-clamp-3">{order.address || '—'}</p>
//           </div>
//         </div>

//         {/* Right — KHQR + Amounts */}
//         <div className="w-[180px] flex flex-col gap-1.5">
//           {/* KHQR QR Box */}
//           <div className="border-[2px] border-black rounded-md flex flex-col overflow-hidden h-[138px]">
//             <div className="bg-black text-white text-center font-bold py-0.5 text-xs tracking-widest uppercase">
//               KHQR
//             </div>
//             <div className="flex-1 flex items-center justify-center bg-white p-1">
//               <div className="border border-dashed border-slate-400 p-0.5">
//                 <img
//                   src="/images/qr.png"
//                   alt="KHQR QR Code"
//                   className="w-20 h-20 object-contain"
//                   crossOrigin="anonymous"
//                 />
//               </div>
//             </div>
//             <div className="border-t-[2px] border-black text-center font-bold text-[10px] py-0.5 bg-white uppercase">
//               SOTH SOUMKANHA
//             </div>
//           </div>

//           {/* Subtotal */}
//           <div className="border-[2px] border-black rounded-md px-2 py-1 h-[30px] flex flex-col justify-center">
//             <div className="flex items-center gap-1.5 text-xs font-bold leading-none">
//               <Tag size={12} className="fill-black text-black" strokeWidth={1}/> តម្លៃ :
//             </div>
//             <div className="font-bold text-sm pl-5 leading-none">${subtotal.toFixed(2)}</div>
//           </div>
//           {/* Delivery */}
//           <div className="border-[2px] border-black rounded-md px-2 py-1 h-[30px] flex flex-col justify-center">
//             <div className="flex items-center gap-1.5 text-xs font-bold leading-none">
//               <Bike size={12} className="text-black" strokeWidth={2}/> ថ្លៃសេវា :
//             </div>
//             <div className="font-bold text-sm pl-5 leading-none">${delivery.toFixed(2)}</div>
//           </div>
//           {/* Total */}
//           <div className="border-[2px] border-black rounded-md px-2 py-1 h-[30px] flex flex-col justify-center">
//             <div className="flex items-center gap-1.5 text-xs font-bold leading-none">
//               <Receipt size={12} className="text-black" strokeWidth={2}/> សរុប :
//             </div>
//             <div className="font-bold text-sm pl-5 leading-none">${total.toFixed(2)}</div>
//           </div>
//         </div>
//       </div>

//       {/* ── Footer: Couriers + Thank-you ── */}
//       <div className="flex items-center justify-between border-t-[3px] border-black pt-2 mt-auto">
//         <div className="flex items-center gap-4 pl-1">
//           {couriers.map((c) => {
//             const isSelected = courier === c;
//             return (
//               <label 
//                 key={c} 
//                 className="flex items-center gap-1.5 text-xs font-bold cursor-pointer select-none"
//               >
//                 <div className="w-4 h-4 border-[2px] border-black rounded-sm flex items-center justify-center bg-white">
//                   {isSelected && <div className="w-2 h-2 bg-black rounded-sm" />}
//                 </div>
//                 {c}
//               </label>
//             );
//           })}
//         </div>
//         <p className="text-base font-black tracking-wide pr-1">សូមអរគុណ!</p>
//       </div>
//     </div>
//   )
// }

// // ── Modal ──────────────────────────────────────────────────────────────────────
// export default function AdminStickerModal({ order, onClose }) {
//   const printRef = useRef(null)
//   const [loading, setLoading] = useState(null)
//   const [courier, setCourier] = useState('')

//   const handlePrint = useReactToPrint({
//     contentRef: printRef,
//     documentTitle: `Sticker-ORD-${order.orderNumber}`,
//     pageStyle: `
//       @page { size: 150mm 100mm landscape; margin: 0; }
//       @media print { body { margin: 0; } }
//     `,
//   })

//   const handleSaveImage = async () => {
//     if (!printRef.current) return
//     setLoading('img')
//     try {
//       const canvas = await html2canvas(printRef.current, {
//         scale: 2,
//         useCORS: true,
//         logging: false,
//         backgroundColor: '#ffffff',
//       })
//       const link = document.createElement('a')
//       link.download = `Sticker-ORD-${order.orderNumber}.png`
//       link.href = canvas.toDataURL('image/png')
//       link.click()
//     } catch (err) {
//       console.error('Image export failed:', err)
//     } finally {
//       setLoading(null)
//     }
//   }

//   const handleSendTelegram = async () => {
//     const token  = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
//     const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID
//     if (!token || !chatId) {
//       alert('សូមកំណត់ VITE_TELEGRAM_BOT_TOKEN និង VITE_TELEGRAM_CHAT_ID ក្នុងឯកសារ .env')
//       return
//     }
//     setLoading('telegram')
//     try {
//       const text =
//         `📦 ស្ទីឃ័រ — ORD:${order.orderNumber}\n` +
//         `👤 ${order.customerName || 'អតិថិជនទូទៅ'}\n` +
//         `📲 ${order.phone || '—'}\n` +
//         `📍 ${order.address || '—'}\n` +
//         `💰 $${(Number(order.total) || 0).toFixed(2)}` +
//         (courier ? `\n🚚 ${courier}` : '')

//       const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ chat_id: chatId, text }),
//       })
//       if (!res.ok) throw new Error('Telegram API error')
//       alert('បានផ្ញើស្ទីឃ័រទៅ Telegram ✅')
//     } catch (err) {
//       console.error(err)
//       alert('មិនអាចផ្ញើទៅ Telegram បានទេ')
//     } finally {
//       setLoading(null)
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">

//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
//           <div>
//             <h2 className="font-bold text-slate-900 text-sm">ស្ទីឃ័រ — Delivery Sticker</h2>
//             <p className="text-xs text-slate-400 mt-0.5">ORD:{order.orderNumber} · 150×100mm</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
//           >
//             <X size={18} className="text-slate-500" />
//           </button>
//         </div>

//         {/* Sticker Preview */}
//         <div className="overflow-auto flex-1 bg-slate-100 flex items-center justify-center p-6" ref={printRef}>
//           <AdminStickerCard order={order} courier={courier} setCourier={setCourier} />
//         </div>

//         {/* Action Buttons */}
//         <div className="p-4 border-t border-slate-100 shrink-0 grid grid-cols-3 gap-2">
//           <button
//             onClick={handlePrint}
//             className="flex flex-col items-center justify-center gap-1 bg-slate-900 text-white text-xs font-semibold py-3 rounded-xl hover:bg-slate-700 transition-colors"
//           >
//             <Printer size={16} />
//             <span>ចាក់ព្រីន</span>
//           </button>

//           <button
//             onClick={handleSaveImage}
//             disabled={loading === 'img'}
//             className="flex flex-col items-center justify-center gap-1 bg-violet-600 text-white text-xs font-semibold py-3 rounded-xl hover:bg-violet-500 transition-colors disabled:opacity-50"
//           >
//             <FileDown size={16} />
//             <span>{loading === 'img' ? 'រក្សា...' : 'រូបភាព'}</span>
//           </button>

//           <button
//             onClick={handleSendTelegram}
//             disabled={loading === 'telegram'}
//             className="flex flex-col items-center justify-center gap-1 bg-sky-500 text-white text-xs font-semibold py-3 rounded-xl hover:bg-sky-400 transition-colors disabled:opacity-50"
//           >
//             <Send size={16} />
//             <span>{loading === 'telegram' ? 'ផ្ញើ...' : 'Telegram'}</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }