import React from 'react'
import StatsCard from '../../../components/common/StatsCard'
import PageHeader from '../../../components/common/PageHeader'
import useDashboard from '../hooks/useDashboard'
import DashboardCharts from '../components/DashboardCharts'

export default function AdminDashboard() {
  const { statsData } = useDashboard()

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
          />
        ))}
      </div>

      <DashboardCharts />
    </div>
  )
}