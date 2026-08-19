import React from 'react'
import DataTable from '../../../common/DataTable'
import PageHeader from '../../../common/PageHeader'

export default function AdminOrders() {
  const orders = [
    { id: 'ORD-001', customer: 'John Doe', total: 79.99, status: 'Completed' },
    { id: 'ORD-002', customer: 'Sarah Smith', total: 199.99, status: 'Pending' },
  ]

  const columns = [
    { header: 'Order ID', accessor: 'id' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Total', render: (row) => `$${row.total.toFixed(2)}` },
    { header: 'Status', render: (row) => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${row.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
        {row.status}
      </span>
    )},
  ]

  return (
    <div className="space-y-6">
      <div>
        <PageHeader 
          title="Orders"
          description="Track and manage store purchases and fulfillments."
        />
      </div>
      <DataTable columns={columns} data={orders} />
    </div>
  )
}