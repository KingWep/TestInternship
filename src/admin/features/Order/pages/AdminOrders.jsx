import React from 'react'
import PageHeader from '../../../common/PageHeader'
import OrderFilterBar from '../components/OrderFilterBar'
import OrderCard from '../components/OrderCard'
import { PackageOpen } from 'lucide-react'

import { useOrders } from '../hooks/useOrders'

export default function AdminOrders() {
  const { 
    orders,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    fromDate,
    setFromDate,
    toDate,
    setToDate
  } = useOrders()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Orders"
          description="Manage and track all customer orders here."
        />
      </div>

      <OrderFilterBar 
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        statusFilter={statusFilter}
        onStatusChange={(e) => setStatusFilter(e.target.value)}
        fromDate={fromDate}
        onFromDateChange={(e) => setFromDate(e.target.value)}
        toDate={toDate}
        onToDateChange={(e) => setToDate(e.target.value)}
      />

      {/* CORRECTED CONDITIONAL RENDERING */}
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...orders]
            .sort((a, b) => b.id - a.id)
            .map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className=" flex flex-col items-center justify-center py-16 text-slate-400">
          <PackageOpen size={64} className="mb-4 mt-20 text-slate-300" strokeWidth={1.5} />
          <h3 className="text-lg font-medium text-slate-600 mb-1">No orders found</h3>
          <p className="text-sm">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  )
}