import React from 'react'
import { Phone, MapPin, Receipt, Printer, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useOrderContext } from '../../../../context/OrderContext'
import DataTable from '../../../components/common/DataTable'
import { ReceiptText , SquarePen } from 'lucide-react'

export default function OrderList({ orders }) {
  const navigate = useNavigate()
  const { updatePaymentStatus } = useOrderContext()

  const columns = [
    {
      header: 'លេខសម្គាល់',
      accessor: 'id',
      render: (order) => (
        <div>
          <div className="font-bold text-blue-600">#{order.id}</div>
          <div className="text-xs text-slate-400">ORD:{order.orderNumber}</div>
        </div>
      )
    },
    {
      header: 'អតិថិជន',
      accessor: 'customer',
      render: (order) => (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Phone size={12} className="text-slate-400" />
            <span>{order.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 max-w-[200px] truncate">
            <MapPin size={12} className="text-slate-400 flex-shrink-0" />
            <span className="truncate">{order.address}</span>
          </div>
        </div>
      )
    },
    {
      header: 'កាលបរិច្ឆេទ',
      accessor: 'date',
      render: (order) => (
        <div>
          <div className="flex items-center gap-2 text-slate-500">
            <Clock size={12} />
            <span>{order.date}</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">{order.time}</div>
        </div>
      )
    },
    {
      header: 'សរុប',
      accessor: 'total',
      render: (order) => (
        <div>
          <div className="font-bold text-emerald-600 px-2.5 py-1 rounded bg-green-100">${order.total.toFixed(2)}</div>
        </div>
      )
    },
    {
      header: 'តម្លៃទំនិញ',
      accessor: 'subtotal',
      render: (order) => (
        <div>
          <div className="font-bold text-red-500">${order.subtotal.toFixed(2)}</div>
        </div>
      )
    },
    {
      header: 'សេវាដឹក',
      accessor: 'delivery',
      render: (order) => (
        <div>
          <div className="font-bold text-slate-400">${order.delivery.toFixed(2)}</div>
        </div>
      )
    },
    {
      header: 'ស្ថានភាព',
      accessor: 'status',
      render: (order) => (
        <span className={`text-xs px-2.5 py-1 rounded font-bold inline-flex items-center gap-1 
          ${order.status === 'Pending'   ? 'bg-amber-100 text-amber-700' :
            order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                           'bg-red-100 text-red-700'}`}>
          {order.status === 'Pending' ? 'រង់ចាំ' : order.status === 'Completed' ? 'បានបញ្ចប់' : order.status === 'Cancelled' ? 'បានលុបចោល' : order.status}
        </span>
      )
    },
    {
      header: 'ការទូទាត់',
      accessor: 'paymentStatus',
      render: (order) => (
        <select
          className={`text-xs px-2 py-1 rounded-md font-bold outline-none cursor-pointer
          ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          value={order.paymentStatus}
          onChange={(e) => updatePaymentStatus(order.id, e.target.value)}
        >
          <option value="Unpaid">មិនទាន់ទូទាត់</option>
          <option value="Paid">បានទូទាត់</option>
        </select>
      )
    },
    {
      header: 'សកម្មភាព',
      accessor: 'actions',
      align: 'right',
      render: (order) => (
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => navigate(`/admin/${order.id}`)}
            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
            title="វិក្កយបត្រ">
            <SquarePen size={16} className=' text-yellow-600'/>
          </button>
          <button
            onClick={() => navigate(`/admin/print-receipt/${order.id}`)}
            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
            title="វិក្កយបត្រ"
          >
            <ReceiptText size={16} className="text-red-500"/>
          </button>
          <button
            onClick={() => navigate(`/admin/print-sticker/${order.id}`)}
            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-violet-50 hover:border-violet-300 hover:text-violet-600 transition-colors"
            title="ស្ទីឃ័រ"
          >
            <Printer size={16} className="text-violet-500" />
          </button>
        </div>
      )
    }
  ]

  return (
    <DataTable 
      columns={columns} 
      data={[...orders].sort((a, b) => b.id - a.id)} 
      keyField="id" 
    />
    
  )
}
