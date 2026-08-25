import React from 'react'
import { Phone, MapPin, Receipt, Printer, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useOrderContext } from '../../../../context/OrderContext'

export default function OrderCard({ order }) {
  const navigate = useNavigate()
  const { updatePaymentStatus } = useOrderContext()

  // Helper for order status styles
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      default:
        return 'bg-rose-50 text-rose-700 border-rose-200'
    }
  }

  // Safe number formatter
  const formatCurrency = (amount) => (typeof amount === 'number' ? amount.toFixed(2) : '0.00')

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-3 md:p-4 flex items-center justify-between border-b border-slate-50 gap-2">
        <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1.5">
          <span className="font-bold text-blue-600 text-xs md:text-sm">#{order?.id}</span>
          <span className="hidden md:inline text-slate-300">-</span>
          <span className="text-[10px] text-slate-500 font-medium md:text-blue-600 md:font-bold md:text-sm">
            ORD:{order?.orderNumber}
          </span>
        </div>

        <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full font-semibold border flex items-center gap-1 shrink-0 ${getStatusBadge(order?.status)}`}>
          <Clock className="w-3 h-3 stroke-[2.5]" />
          {order?.status === 'Pending' ? 'រង់ចាំ' : order?.status === 'Completed' ? 'បានបញ្ចប់' : order?.status === 'Cancelled' ? 'បានលុបចោល' : order?.status || 'មិនដឹង'}
        </span>
      </div>

      {/* Customer Info */}
      <div className="p-3 md:p-4 space-y-2 text-slate-600 text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate font-medium">{order?.phone || 'គ្មានលេខទូរស័ព្ទ'}</span>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span className="truncate text-slate-500 leading-relaxed">{order?.address || 'មិនមានអាសយដ្ឋាន'}</span>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-slate-50/70 px-3 py-2.5 md:p-4 border-y border-slate-100 space-y-1.5 flex-1 flex flex-col justify-center">
        <div className="flex justify-between text-xs md:text-sm">
          <span className="text-slate-500">តម្លៃទំនិញ:</span>
          <span className="font-semibold text-slate-700">${formatCurrency(order?.subtotal)}</span>
        </div>
        <div className="flex justify-between text-xs md:text-sm">
          <span className="text-slate-500">សេវាដឹក:</span>
          <span className="font-semibold text-slate-700">${formatCurrency(order?.delivery)}</span>
        </div>
        <div className="flex justify-between text-xs md:text-sm pt-1.5 border-t border-slate-200/60">
          <span className="font-bold text-slate-800">សរុប:</span>
          <span className="font-bold text-emerald-600">${formatCurrency(order?.total)}</span>
        </div>
      </div>

      {/* Footer Info & Payment Status */}
      <div className="p-3 md:p-4 flex items-center justify-between gap-2 border-b border-slate-50">
        <select
          aria-label="Payment Status"
          className={`text-[11px] md:text-xs px-2.5 py-1 rounded-lg font-semibold outline-none cursor-pointer border transition-colors ${
            order?.paymentStatus === 'Paid'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-1 focus:ring-emerald-400'
              : 'bg-rose-50 text-rose-700 border-rose-200 focus:ring-1 focus:ring-rose-400'
          }`}
          value={order?.paymentStatus || 'Unpaid'}
          onChange={(e) => updatePaymentStatus(order.id, e.target.value)}
        >
          <option value="Unpaid" className="bg-white text-slate-800">មិនទាន់ទូទាត់</option>
          <option value="Paid" className="bg-white text-slate-800">បានទូទាត់</option>
        </select>

        <div className="flex items-center gap-1 text-slate-400 text-[10px] md:text-xs">
          <Clock className="w-3 h-3 shrink-0" />
          <span className="truncate">{order?.date} <span className="hidden md:inline">{order?.time}</span></span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-3 md:p-4 flex gap-2">
        <button
          onClick={() => navigate(`/admin/print-receipt/${order.id}`)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:border-red-300 hover:text-red-600 transition-all font-medium text-xs md:text-sm shadow-2xs"
        >
          <Receipt className="w-4 h-4 text-red-500 shrink-0" />
          <span>វិក្កយបត្រ</span>
        </button>
        <button
          onClick={() => navigate(`/admin/print-sticker/${order.id}`)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:border-violet-300 hover:text-violet-600 transition-all font-medium text-xs md:text-sm shadow-2xs"
        >
          <Printer className="w-4 h-4 text-violet-500 shrink-0" />
          <span>ស្ទីឃ័រ</span>
        </button>
      </div>
    </div>
  )
}