import React from 'react'
import PageHeader from '../../../common/PageHeader' // ប្រើ Component ដូច Products
import OrderFilterBar from '../components/OrderFilterBar'
import OrderCard from '../components/OrderCard'

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
      {/* 1. កែ Header មកប្រើ PageHeader និងដាក់ជាភាសាអង់គ្លេស */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Orders"
          description="Manage and track all customer orders here."
        />
      </div>

      {/* 2. ផ្នែក Filter នេះអ្នកត្រូវចូលទៅកែអក្សរក្នុង file របស់វា */}
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

      {/* 3. រក្សាទម្រង់ Grid Card ទុកដដែល */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}