import React from 'react'
import { Phone, MapPin, Receipt, Printer, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useOrderContext } from '../../../../context/OrderContext'

export default function OrderCard({ order }) {
  const navigate = useNavigate()
  const { updatePaymentStatus } = useOrderContext()
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <h4 className="font-bold text-blue-600 text-sm">
          #{order.id} - ORD:{order.orderNumber}
        </h4>
        <span className={`text-xs px-2.5 py-1 rounded-md font-bold flex items-center gap-1 
        ${order.status === 'Pending'   ? 'bg-amber-100 text-amber-700' :
          order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                         'bg-red-100 text-red-700'}`}>
          <Clock size={12} className="stroke-[3]" />
          {order.status}
        </span>
      </div>

      {/* Customer Info */}
      <div className="px-4 pb-4 space-y-2">

        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <Phone size={14} className="text-slate-400" />
          <span>{order.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <MapPin size={14} className="text-slate-400" />
          <span className="truncate">{order.address}</span>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-slate-50 p-4 border-y border-slate-100 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">តម្លៃទំនិញ (Subtotal):</span>
          <span className="font-semibold text-blue-500">${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">សេវាដឹក (Delivery):</span>
          <span className="font-semibold text-slate-700">${order.delivery.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm pt-1 border-t border-slate-200 mt-1">
          <span className="font-bold text-slate-800">សរុបទឹកប្រាក់ (Total):</span>
          <span className="font-bold text-emerald-600">${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 flex items-center justify-between">
        <select
          className={`text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1 
          ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          value={order.paymentStatus}
          onChange={(e) =>
            updatePaymentStatus(order.id, e.target.value)
          }
        >
          <option value="Unpaid">Unpaid</option>
          <option value="Paid">Paid</option>
        </select>
        <div className="flex items-center gap-1 text-slate-400 text-xs">
          <Clock size={12} />
          <span>{order.date} {order.time}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4 flex gap-2">
        <button
          onClick={() => navigate(`/admin/print-receipt/${order.id}`)}
          className="flex-1 flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-xl text-slate-600 text-sm hover:bg-slate-50 hover:border-red-300 hover:text-red-600 transition-colors"
        >
          <Receipt size={16} className="text-red-500" />
          វិក្កយបត្រ
        </button>
        <button
          onClick={() => navigate(`/admin/print-sticker/${order.id}`)}
          className="flex-1 flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-xl text-slate-600 text-sm hover:bg-slate-50 hover:border-violet-300 hover:text-violet-600 transition-colors"
        >
          <Printer size={16} className="text-violet-500" />
          ស្ទីឃ័រ
        </button>
      </div>
    </div>
  )
}
