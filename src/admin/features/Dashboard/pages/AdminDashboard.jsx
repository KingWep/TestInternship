import React from 'react'
import StatsCard from '../../../components/common/StatsCard'
import PageHeader from '../../../components/common/PageHeader'
import useDashboard from '../hooks/useDashboard'
import DashboardCharts from '../components/DashboardCharts'
import DataTable from '@/admin/components/common/DataTable'
import { Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function AdminDashboard() {

  const { statsData, recentOrders } = useDashboard()

  const columns = [
    { header: 'Order Number', accessor: 'orderNumber' },
    { header: 'Total', render: (row) => `$${row.total.toFixed(2)}` },
    { header: 'paymentStatus', 
render: (row) => (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${row.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : row.paymentStatus === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
        {row.paymentStatus}
      </span>
    )
     },
    { header: 'Status', render: (row) => (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${row.status === 'Completed' ? 'bg-green-100 text-green-800' : row.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
        {row.status}
      </span>
    )},
    { header: 'Date', render: (row) => `${row.date} ${row.time}` },
    { header: 'Actions', align: 'right', render: (row) => (
      <div className="flex justify-end space-x-2">
        <Link 
          to="/admin/orders" 
          className="px-5 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Eye className="w-4 h-4" />
        </Link>
      </div>
    )}
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Overview"
        description="Welcome back! Here is what's happening in your shop today."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <StatsCard
            key={stat.title || index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            color={stat.color}
            warning={stat.warning}
            note={stat.note}
            link={stat.link}
          />
        ))}
      </div>

      <DashboardCharts />

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Latest Orders</h2>
        <DataTable
          columns={columns}
          data={recentOrders}
        />
      </div>
    </div>
  )
}