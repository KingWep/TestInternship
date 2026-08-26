import React, { useState } from 'react'
import PageHeader from '../../../components/common/PageHeader'
import OrderFilterBar from '../components/OrderFilterBar'
import OrderCard from '../components/OrderCard'
import OrderList from '../components/OrderList'
import { PackageOpen, LayoutGrid, List } from 'lucide-react'

import { useOrders } from '../hooks/useOrders'

export default function AdminOrders() {
  const [viewMode, setViewMode] = useState('list')
  const {
    orders,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    paymentFilter,
    setPaymentFilter,
    fromDate,
    setFromDate,
    toDate,
    setToDate
  } = useOrders()

  return (
    <div className="space-y-6">
      <div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
        <PageHeader
          title="ការបញ្ជាទិញ"
          description="គ្រប់គ្រង និងតាមដានរាល់ការបញ្ជាទិញរបស់អតិថិជននៅទីនេះ។"
        />
        {/* View Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'list'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <List size={16} />
            <span className="hidden sm:inline">បញ្ជី</span>
          </button>
          <button
            onClick={() => setViewMode('card')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'card'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <LayoutGrid size={16} />
            <span className="hidden sm:inline">កាត</span>
          </button>
        </div>
      </div>

      <OrderFilterBar
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        statusFilter={statusFilter}
        onStatusChange={(e) => setStatusFilter(e.target.value)}
        paymentFilter={paymentFilter}
        onPaymentChange={(e) => setPaymentFilter(e.target.value)}
        fromDate={fromDate}
        onFromDateChange={(e) => setFromDate(e.target.value)}
        toDate={toDate}
        onToDateChange={(e) => setToDate(e.target.value)}
      />

      {/* CORRECTED CONDITIONAL RENDERING */}
      {orders.length > 0 ? (
        viewMode === 'card' ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {[...orders]
              .sort((a, b) => b.id - a.id)
              .map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        ) : (
          <OrderList orders={orders} />
        )
      ) : (
        <div className=" flex flex-col items-center justify-center py-16 text-slate-400">
          <PackageOpen size={64} className="mb-4 mt-20 text-slate-300" strokeWidth={1.5} />
          <h3 className="text-lg font-medium text-slate-600 mb-1">រកមិនឃើញការបញ្ជាទិញទេ</h3>
          <p className="text-sm">សូមសាកល្បងផ្លាស់ប្តូរការស្វែងរក ឬតម្រងរបស់អ្នក។</p>
        </div>
      )}
    </div>
  )
}