// import { useRef, useState } from 'react'
// import { X, Printer, FileDown, Send } from 'lucide-react'
// import { useReactToPrint } from 'react-to-print'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'

// // ── Printable Receipt Card ─────────────────────────────────────────────────────
// function AdminReceiptCard({ order }) {
//   const subtotal = Number(order.subtotal) || 0
//   const delivery = Number(order.delivery) || 0
//   const total    = Number(order.total)    || 0

//   return (
//     <div
//       id="admin-receipt-card"
//       className="bg-white text-black w-full max-w-xs mx-auto text-sm px-6 py-6"
//     >
//       {/* Shop Header */}
//       <div className="text-center border-b-[2px] border-dashed border-black pb-4 mb-4">
//         <h2 className="font-bold text-lg font-serif tracking-wide uppercase">ONE CARE SHOP</h2>
//         <p className="text-[13px] mt-1">ទូរស័ព្ទ: 088 66 77 456</p>
//         <p className="text-[13px]">ភ្នំពេញ, កម្ពុជា</p>
//       </div>

//       {/* Order Meta */}
//       <div className="text-[13px] space-y-1 mb-4 flex flex-col items-start border-b-[2px] border-dashed border-black pb-4">
//         <div>
//           <span className="font-semibold">វិក្កយបត្រ:</span> <span className="font-mono">ORD:{order.orderNumber}</span>
//         </div>
//         <div>
//           <span className="font-semibold">កាលបរិច្ឆេទ:</span> <span className="font-mono">{order.date} {order.time}</span>
//         </div>
//         {order.customerName && (
//           <div>
//             <span className="font-semibold">អតិថិជន:</span> <span>{order.customerName}</span>
//           </div>
//         )}
//         <div>
//           <span className="font-semibold">ទូរស័ព្ទអតិថិជន:</span> <span className="font-mono">{order.phone}</span>
//         </div>
//       </div>

//       {/* Items Table */}
//       <div className="mb-4">
//         {/* Table header */}
//         <div className="grid grid-cols-[45%_15%_20%_20%] gap-x-1 text-[13px] font-bold mb-2 pb-1 border-b-[2px] border-dashed border-black">
//           <span className="text-center">ទំនិញ</span>
//           <span className="text-center">ចំនួន</span>
//           <span className="text-right">តម្លៃ</span>
//           <span className="text-right">សរុប</span>
//         </div>

//         {order.items && order.items.length > 0 ? (
//           <div className="border-b-[2px] border-dashed border-black pb-3">
//             {order.items.map((item, idx) => {
//               const price = Number(item.price) || Number(item.salePrice) || 0
//               const qty   = Number(item.quantity) || 0
//               return (
//                 <div key={item.id ?? idx} className="grid grid-cols-[45%_15%_20%_20%] gap-x-1 text-[13px] mb-1.5 items-start font-serif">
//                   <span className="pr-1 break-words">{item.name}</span>
//                   <span className="text-center tabular-nums">{qty}</span>
//                   <span className="text-right tabular-nums">${price.toFixed(2)}</span>
//                   <span className="text-right tabular-nums">${(price * qty).toFixed(2)}</span>
//                 </div>
//               )
//             })}
//           </div>
//         ) : (
//           <p className="text-xs text-center py-2 border-b-[2px] border-dashed border-black">គ្មានទំនិញ</p>
//         )}
//       </div>

//       {/* Totals */}
//       <div className="space-y-1.5 pb-4 mb-4 border-b-[2px] border-dashed border-black text-[13px]">
//         <div className="flex justify-between">
//           <span>តម្លៃទំនិញសរុប (Subtotal):</span>
//           <span className="tabular-nums font-serif">${subtotal.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>សេវាដឹកជញ្ជូន (Delivery):</span>
//           <span className="tabular-nums font-serif">${delivery.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between font-bold pt-1">
//           <span>ទឹកប្រាក់សរុប (Total):</span>
//           <span className="tabular-nums font-serif">${total.toFixed(2)}</span>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="text-center mt-2 space-y-1">
//         <p className="text-[12px] font-bold">
//           អរគុណសម្រាប់ការគាំទ្រ!
//         </p>
//         <p className="text-[12px] font-serif">Thank You! Please Come Again</p>
//       </div>
//     </div>
//   )
// }

// // ── Modal ──────────────────────────────────────────────────────────────────────
// export default function AdminReceiptModal({ order, onClose }) {
//   const printRef = useRef(null)
//   const [loading, setLoading] = useState(null)

//   const handlePrint = useReactToPrint({
//     contentRef: printRef,
//     documentTitle: `Receipt-ORD-${order.orderNumber}`,
//   })

//   const handleSavePdf = async () => {
//     if (!printRef.current) return
//     setLoading('pdf')
//     try {
//       const canvas = await html2canvas(printRef.current, {
//         scale: 2,
//         useCORS: true,
//         logging: false,
//       })
//       const imgData = canvas.toDataURL('image/png')
//       const pdf = new jsPDF('p', 'mm', 'a4')

//       const pageWidth  = pdf.internal.pageSize.getWidth()
//       const pageHeight = pdf.internal.pageSize.getHeight()
//       const imgWidth   = 90
//       const imgHeight  = (canvas.height * imgWidth) / canvas.width
//       const xCoord     = (pageWidth - imgWidth) / 2
//       const yCoord     = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : 10

//       pdf.addImage(imgData, 'PNG', xCoord, yCoord, imgWidth, imgHeight)
//       pdf.save(`Receipt-ORD-${order.orderNumber}.pdf`)
//     } catch (err) {
//       console.error('PDF generation failed:', err)
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
//       const lines = (order.items || [])
//         .map((i) => {
//           const p = Number(i.price) || Number(i.salePrice) || 0
//           const q = Number(i.quantity) || 0
//           return `• ${i.name} × ${q} — $${(p * q).toFixed(2)}`
//         })
//         .join('\n')

//       const text =
//         `🧾 វិក្កយបត្រ ORD:${order.orderNumber}\n` +
//         `👤 ${order.customerName || ''} (${order.phone})\n` +
//         `📍 ${order.address}\n` +
//         `📅 ${order.date} ${order.time}\n` +
//         `------------------------\n${lines}\n` +
//         `------------------------\n` +
//         `🔹 Subtotal: $${(Number(order.subtotal) || 0).toFixed(2)}\n` +
//         `🚚 Delivery: $${(Number(order.delivery) || 0).toFixed(2)}\n` +
//         `💰 Total:    $${(Number(order.total) || 0).toFixed(2)}`

//       const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ chat_id: chatId, text }),
//       })
//       if (!res.ok) throw new Error('Telegram API error')
//       alert('បានផ្ញើវិក្កយបត្រទៅ Telegram ✅')
//     } catch (err) {
//       console.error(err)
//       alert('មិនអាចផ្ញើទៅ Telegram បានទេ')
//     } finally {
//       setLoading(null)
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl w-full max-w-sm max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">

//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
//           <div>
//             <h2 className="font-bold text-slate-900 text-sm">វិក្កយបត្រ</h2>
//             <p className="text-xs text-slate-400 mt-0.5">ORD:{order.orderNumber}</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
//           >
//             <X size={18} className="text-slate-500" />
//           </button>
//         </div>

//         {/* Receipt Preview */}
//         <div className="overflow-y-auto flex-1 bg-slate-50" ref={printRef}>
//           <AdminReceiptCard order={order} />
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
//             onClick={handleSavePdf}
//             disabled={loading === 'pdf'}
//             className="flex flex-col items-center justify-center gap-1 bg-blue-600 text-white text-xs font-semibold py-3 rounded-xl hover:bg-blue-500 transition-colors disabled:opacity-50"
//           >
//             <FileDown size={16} />
//             <span>{loading === 'pdf' ? 'រក្សា...' : 'PDF'}</span>
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
