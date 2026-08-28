import React from 'react'
import {
  Phone,
  MapPin,
  Receipt,
  Printer,
  Clock,
  Edit3,
  ChevronDown,
  Package
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useOrderContext } from '../../../../context/OrderContext'

export default function OrderCard({ order, onEdit }) {
  const navigate = useNavigate()
  const { updatePaymentStatus, updateOrderStatus } = useOrderContext()

  // Updated to match OrderList statusConfig styles (adjusted for card aesthetics)
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'Pickup':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'Delivering':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200'
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200'
    }
  }

  // Updated to match OrderList labels
  const getStatusText = (status) => {
    switch (status) {
      case 'Pending':
        return 'រង់ចាំ'
      case 'Pickup':
        return 'បានយកទំនិញ'
      case 'Delivering':
        return 'កំពុងដឹក'
      case 'Completed':
        return 'បានបញ្ចប់'
      case 'Cancelled':
        return 'បានបោះបង់'
      default:
        return status || 'មិនដឹង'
    }
  }

  const formatCurrency = (amount) =>
    typeof amount === 'number' ? amount.toFixed(2) : '0.00'

  // Calculations synced with OrderList logic
  const totalAmount = Number(order?.totalAmount || order?.total || 0)
  const deliveryFee = Number(order?.deliveryFee || 0)
  const subtotal = totalAmount - deliveryFee

  return (
    <div className="group flex h-full min-w-0 w-full flex-col overflow-hidden rounded-lg sm:rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">

      <div className="h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

      {/* Header */}
      <div className="relative overflow-hidden border-b border-blue-100/70 bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-2.5 py-2 sm:px-3 sm:py-2.5">
        <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-blue-100/40 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-8 h-20 w-20 rounded-full bg-indigo-100/30 blur-2xl" />

        <div className="relative z-10 flex min-w-0 items-center justify-between gap-1.5 sm:gap-2">

          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-white/90 text-blue-600 shadow-sm sm:h-8 sm:w-8 sm:rounded-xl">
              <Package className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </div>

            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-1">
                <span className="truncate text-[10px] font-black tracking-tight text-slate-800 sm:text-xs">
                  #{order?.id}
                </span>

                <span className="max-w-[70px] truncate rounded-md border border-slate-200/80 bg-white/80 px-1 py-0.5 font-mono text-[8px] font-bold text-slate-500 sm:max-w-none sm:text-[9px]">
                  {order?.orderNo || `ORD-${order?.orderNumber}`}
                </span>
              </div>

              <div className="mt-0.5 flex min-w-0 items-center gap-1 text-[8px] font-medium text-slate-400 sm:text-[9px]">
                <Clock className="h-2 w-2 shrink-0 text-slate-400 sm:h-2.5 sm:w-2.5" />
                <span className="truncate">
                  {order?.createdAt
                    ? new Date(order.createdAt).toLocaleString("km-KH", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="relative shrink-0">
            <select
              aria-label="Order Status"
              value={order?.status || 'Pending'}
              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
              className={`appearance-none rounded-full border pl-2 pr-5 py-0.5 text-[8px] font-bold shadow-sm outline-none transition-all sm:pl-2.5 sm:pr-6 sm:py-1 sm:text-[9px] cursor-pointer ${getStatusStyle(order?.status)}`}
            >
              <option value="Pending">រង់ចាំ</option>
              <option value="Pickup">បានយកទំនិញ</option>
              <option value="Delivering">កំពុងដឹក</option>
              <option value="Completed">បានបញ្ចប់</option>
              <option value="Cancelled">បានបោះបង់</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 opacity-70" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 px-2.5 py-2 sm:px-3 sm:py-2.5">
        <div className="space-y-1.5 sm:space-y-2">

          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-50 text-slate-500 sm:h-6 sm:w-6 sm:rounded-lg">
              <Phone className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[8px] font-medium text-slate-400 sm:text-[9px]">
                លេខទូរស័ព្ទ
              </p>

              <p className="truncate text-[10px] font-semibold text-slate-700 sm:text-[11px]">
                {order?.customerPhone || order?.phone || 'គ្មានលេខទូរស័ព្ទ'}
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-start gap-1.5 sm:gap-2">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-50 text-slate-500 sm:h-6 sm:w-6 sm:rounded-lg">
              <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[8px] font-medium text-slate-400 sm:text-[9px]">
                អាសយដ្ឋាន
              </p>

              <p className="line-clamp-2 break-words text-[10px] font-medium leading-3.5 text-slate-600 sm:text-[11px] sm:leading-4">
                {order?.customerAddress || order?.address || 'មិនមានអាសយដ្ឋាន'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Pricing */}
      <div className="border-y border-slate-100 bg-slate-50/60 px-2.5 py-2 sm:px-3">
        <div className="flex items-center justify-between gap-2 text-[9px] sm:text-[10px]">
          <span className="text-slate-500">តម្លៃទំនិញ</span>

          <span className="shrink-0 font-semibold text-slate-700">
            ${formatCurrency(subtotal)}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2 text-[9px] sm:text-[10px]">
          <span className="text-slate-500">សេវាដឹក</span>

          <span className="shrink-0 font-semibold text-slate-700">
            ${formatCurrency(deliveryFee)}
          </span>
        </div>

        <div className="mt-1.5 flex items-center justify-between gap-2 border-t border-slate-200 pt-1.5">
          <span className="text-[10px] font-bold text-slate-700 sm:text-[11px]">
            សរុប
          </span>

          <span className="shrink-0 text-xs font-black text-blue-600 sm:text-sm">
            ${formatCurrency(totalAmount)}
          </span>
        </div>
      </div>

      {/* Payment */}
      <div className="flex min-w-0 items-center gap-1.5 px-2.5 py-2 sm:gap-2 sm:px-3">
        <div className="relative min-w-0 flex-1">
          <select
            aria-label="Payment Status"
            value={order?.paymentStatus || 'Unpaid'}
            onChange={(e) =>
              updatePaymentStatus(order.id, e.target.value)
            }
            className={`h-7 w-full min-w-0 appearance-none rounded-md border pl-1.5 pr-5 text-[9px] font-bold outline-none transition-all sm:h-7 sm:rounded-lg sm:pl-2 sm:pr-6 sm:text-[10px] ${
              order?.paymentStatus === 'Paid'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700 focus:ring-2 focus:ring-emerald-100'
                : 'border-rose-200 bg-rose-50 text-rose-700 focus:ring-2 focus:ring-rose-100'
            }`}
          >
            <option value="Unpaid">មិនទាន់ទូទាត់</option>
            <option value="Paid">បានទូទាត់</option>
          </select>

          <ChevronDown
            className={`pointer-events-none absolute right-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 sm:right-2 sm:h-3 sm:w-3 ${
              order?.paymentStatus === 'Paid'
                ? 'text-emerald-600'
                : 'text-rose-600'
            }`}
          />
        </div>

        <span
          className={`shrink-0 rounded-md px-1.5 py-1 text-[8px] font-semibold sm:rounded-lg sm:text-[9px] ${
            order?.paymentStatus === 'Paid'
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-rose-50 text-rose-600'
          }`}
        >
          {order?.paymentStatus === 'Paid' ? 'Paid' : 'Unpaid'}
        </span>
      </div>

      {/* Actions */}
      <div className="mx-2 mb-2 grid grid-cols-3 overflow-hidden rounded-md border border-slate-200 bg-white sm:mx-3 sm:mb-2.5 sm:rounded-lg">

        <button
          onClick={onEdit}
          className="flex min-w-0 items-center justify-center gap-0.5 bg-white px-1 py-1.5 text-[8px] font-semibold text-slate-600 transition-all hover:bg-blue-50 hover:text-blue-600 sm:gap-1 sm:py-1.5 sm:text-[9px]"
        >
          <Edit3 className="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" />
          <span className="truncate">កែប្រែ</span>
        </button>

        <button
          onClick={() => navigate(`/admin/print-receipt/${order.id}`)}
          className="flex min-w-0 items-center justify-center gap-0.5 border-x border-slate-200 bg-white px-1 py-1.5 text-[8px] font-semibold text-slate-600 transition-all hover:bg-rose-50 hover:text-rose-600 sm:gap-1 sm:py-1.5 sm:text-[9px]"
        >
          <Receipt className="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" />
          <span className="truncate">វិក្កយបត្រ</span>
        </button>

        <button
          onClick={() => navigate(`/admin/print-sticker/${order.id}`)}
          className="flex min-w-0 items-center justify-center gap-0.5 bg-white px-1 py-1.5 text-[8px] font-semibold text-slate-600 transition-all hover:bg-violet-50 hover:text-violet-600 sm:gap-1 sm:py-1.5 sm:text-[9px]"
        >
          <Printer className="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" />
          <span className="truncate">ស្ទីឃ័រ</span>
        </button>

      </div>
    </div>
  )
}