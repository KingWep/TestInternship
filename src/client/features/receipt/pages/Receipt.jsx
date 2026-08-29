import React, { useRef, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useParams, Link } from 'react-router-dom'
import { Printer, FileDown, Send, ArrowLeft, Loader2, Package } from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
import { toPng } from 'html-to-image'
import { useOrderContext } from '../../../../context/OrderContext'
import { orderService } from '../../../../services/orderService'
import { sendOrderToTelegram } from '../../../../services/telegramService'

export function ReceiptCard({ order }) {
  const delivery = Number(order?.deliveryFee ?? order?.delivery ?? 0)
  const total = Number(order?.totalAmount ?? order?.total ?? 0)
  const rawItems = order?.orderDetails || order?.items || []

  const itemsTotal = rawItems.reduce((sum, item) => {
    const price = Number(item.price || item.salePrice || 0)
    const qty = Number(item.quantity || 1)
    return sum + price * qty
  }, 0)

  const subtotal = Number(order?.subtotal) || (itemsTotal > 0 ? itemsTotal : (total > delivery ? total - delivery : 0))
  const finalTotal = total > 0 ? total : (subtotal + delivery)

  const orderNum = order?.orderNo || order?.orderNumber || order?.id || 'N/A'
  const dateFormatted = order?.createdAt
    ? new Date(order.createdAt).toLocaleString("km-KH", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : `${order?.date || ''} ${order?.time || ''}`.trim() || new Date().toLocaleDateString("km-KH")

  return (
    <div
      id="receipt-card"
      style={{ 
        width: '340px',
        fontFamily: "'Geist Variable', 'Battambang', 'Siemreap', 'Kantumruy Pro', 'Noto Sans Khmer', sans-serif",
        boxSizing: 'border-box',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility'
      }}
      className="bg-white text-slate-900 mx-auto text-xs px-5 py-6 shadow-sm border border-slate-900 rounded-xl overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="text-center border-b border-dashed border-slate-800 pb-3 mb-3 w-full">
        <h2 className="font-black text-base tracking-wider uppercase text-slate-900 leading-tight">ONE CARE SHOP</h2>
        <p className="text-[11px] text-slate-900 mt-1">ទូរស័ព្ទ: 088 66 77 456</p>
        <p className="text-[11px] text-slate-900">ភ្នំពេញ, កម្ពុជា</p>
      </div>

      {/* Meta Info */}
      <div className="text-[11px] space-y-1.5 mb-3 flex flex-col border-b border-dashed border-slate-800 pb-3 text-slate-700 w-full">
        <div className="flex justify-between items-center w-full">
          <span className="font-medium text-slate-900">លេខវិក្កយបត្រ:</span> 
          <span className="font-mono font-bold text-slate-900">ORD:{orderNum}</span>
        </div>
        <div className="flex justify-between items-center w-full">
          <span className="font-medium text-slate-900">កាលបរិច្ឆេទ:</span> 
          <span className="font-mono text-slate-800">{dateFormatted}</span>
        </div>
        {order?.customerName && (
          <div className="flex justify-between items-center w-full">
            <span className="font-medium text-slate-900">អតិថិជន:</span> 
            <span className="font-bold text-slate-900 truncate max-w-[180px]">{order.customerName}</span>
          </div>
        )}
        <div className="flex justify-between items-center w-full">
          <span className="font-medium text-slate-900">លេខទូរស័ព្ទ:</span> 
          <span className="font-mono text-slate-900 font-semibold">{order?.customerPhone || order?.phone || '—'}</span>
        </div>
        {(order?.customerAddress || order?.address) && (
          <div className="flex justify-between items-start w-full">
            <span className="font-medium text-slate-900 shrink-0">អាសយដ្ឋាន:</span> 
            <span className="text-slate-800 text-right truncate max-w-[190px]">{order.customerAddress || order.address}</span>
          </div>
        )}
      </div>

      {/* Items Table */}
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
            {rawItems.length > 0 ? (
              rawItems.map((item, idx) => {
                const price = Number(item.price || item.salePrice || 0)
                const qty   = Number(item.quantity || 1)
                const name  = item.product_name || item.name || 'ទំនិញ'
                return (
                  <tr key={item.id ?? idx} className="text-slate-800">
                    <td className="py-1.5 pr-1 font-medium break-words text-left align-top leading-snug">
                      {name}
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

      {/* Pricing Summary */}
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
          <span className="tabular-nums font-black text-slate-950">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Footer message */}
      <div className="text-center space-y-0.5 pt-0.5 w-full">
        <p className="text-[11px] font-bold text-slate-900">
          អរគុណសម្រាប់ការគាំទ្រ! 🙏
        </p>
        <p className="text-[10px] text-slate-900 font-medium tracking-wide uppercase">សូមអញ្ជើញមកម្តងទៀត</p>
      </div>
    </div>
  )
}

export default function Receipt() {
  const { orderId } = useParams()
  const { orders } = useOrderContext()
  const [fetchedOrder, setFetchedOrder] = useState(null)
  const [fetching, setFetching] = useState(false)

  const printRef = useRef(null)
  const [actionLoading, setActionLoading] = useState(null)

  // Find order from global context by ID / orderNo / orderNumber
  const contextOrder = orders?.find(
    (o) => String(o.id) === String(orderId) ||
           String(o.orderNo) === String(orderId) ||
           String(o.orderNumber) === String(orderId)
  )

  const order = contextOrder || fetchedOrder

  // Fallback: Fetch order directly from API if page was refreshed
  useEffect(() => {
    if (!contextOrder && orderId) {
      let isMounted = true
      setFetching(true)
      orderService.getOrder(orderId)
        .then((res) => {
          if (isMounted) {
            const data = res?.data || res
            if (data) setFetchedOrder(data)
          }
        })
        .catch((err) => {
          console.error("Failed to fetch order:", err)
        })
        .finally(() => {
          if (isMounted) setFetching(false)
        })

      return () => { isMounted = false }
    }
  }, [orderId, contextOrder])

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Receipt-ORD-${order?.orderNo || order?.orderNumber || order?.id || 'order'}`,
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
        #receipt-card {
          margin: auto !important;
          border: none !important;
          box-shadow: none !important;
        }
      }
    `,
  })

  const handleSaveImage = async () => {
    if (!printRef.current) return
    setActionLoading('img')
    try {
      await document.fonts.ready

      const dataUrl = await toPng(printRef.current, {
        cacheBust: true,
        pixelRatio: 4,
        backgroundColor: '#ffffff'
      })

      const link = document.createElement('a')
      link.download = `Receipt-ORD-${order.orderNo || order.orderNumber || order.id}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Image export failed:', err)
      Swal.fire({
        icon: 'error',
        title: 'បរាជ័យ!',
        text: 'មានបញ្ហាក្នុងការទាញយករូបភាព!',
        confirmButtonColor: '#0f172a',
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleSendTelegram = async () => {
    setActionLoading('telegram')

    try {
      await sendOrderToTelegram(order)

      Swal.fire({
        icon: 'success',
        title: 'ជោគជ័យ! ✅',
        text: 'បានផ្ញើវិក្កយបត្រទៅ Telegram រួចរាល់ហើយ!',
        confirmButtonColor: '#0284c7',
        timer: 3000,
        timerProgressBar: true,
      })
    } catch (error) {
      console.error('Telegram error:', error)

      Swal.fire({
        icon: 'error',
        title: 'បរាជ័យ!',
        text: error.message || 'មិនអាចផ្ញើទៅ Telegram បានទេ',
        confirmButtonColor: '#0f172a',
      })
    } finally {
      setActionLoading(null)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <Loader2 size={36} className="animate-spin text-slate-700 mb-3" />
        <p className="text-sm font-medium text-slate-600">កំពុងទាញយកព័ត៌មានវិក្កយបត្រ...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
          <Package size={28} />
        </div>
        <p className="text-base font-semibold text-slate-700 mb-1">រកមិនឃើញវិក្កយបត្រនេះទេ</p>
        <p className="text-xs text-slate-400 mb-4">លេខសម្គាល់: #{orderId}</p>
        <Link to="/" className="flex items-center gap-2 text-slate-700 hover:text-slate-900 bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-200 text-sm font-medium transition-colors">
          <ArrowLeft size={16} />
          <span>ត្រលប់ទៅទំព័រដើម</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-8 px-4 font-sans text-slate-800">
      <div className="w-full max-w-md flex items-center justify-between mb-5">
        <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 bg-white px-3.5 py-1.5 rounded-lg shadow-xs border border-slate-200 text-sm font-medium transition-colors">
          <ArrowLeft size={16} />
          <span>ត្រលប់ក្រោយ</span>
        </Link>
        <span className="text-xs font-bold text-slate-900 bg-white border border-slate-200 px-3 py-1 rounded-lg">
          ទម្រង់វិក្កយបត្រ (Receipt)
        </span>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-2xl mb-6 border border-slate-200 flex items-center justify-center">
        <div ref={printRef} className="bg-white inline-block">
          <ReceiptCard order={order} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 max-w-md w-full">
        <button
          onClick={handlePrint}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all text-sm font-semibold shadow-sm cursor-pointer"
        >
          <Printer size={16} />
          បោះពុម្ព
        </button>

        <button
          onClick={handleSaveImage}
          disabled={actionLoading === 'img'}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 px-4 py-2.5 rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all text-sm font-semibold shadow-2xs disabled:opacity-60 cursor-pointer"
        >
          {actionLoading === 'img' ? <Loader2 size={16} className="animate-spin text-slate-900" /> : <FileDown size={16} />}
          {actionLoading === 'img' ? 'កំពុងទាញយក...' : 'ទាញយក PNG'}
        </button>

        <button
          onClick={handleSendTelegram}
          disabled={actionLoading === 'telegram'}
          className="w-full flex items-center justify-center gap-2 bg-sky-600 text-white px-4 py-2.5 rounded-xl hover:bg-sky-500 active:scale-[0.98] transition-all text-sm font-semibold shadow-xs disabled:opacity-60 cursor-pointer"
        >
          {actionLoading === 'telegram' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {actionLoading === 'telegram' ? 'កំពុងផ្ញើ...' : 'ផ្ញើទៅ Telegram'}
        </button>
      </div>
    </div>
  )
}