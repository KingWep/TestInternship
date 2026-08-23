import React from 'react'
import { LayoutDashboard, ShoppingBag, ClipboardList, Users, DollarSign } from 'lucide-react'
import StatsCard from '../../../components/StatsCard'
import PageHeader from '../../../common/PageHeader'
import { useProductContext } from '../../../../context/ProductContext'

export default function AdminDashboard() {
  const { products } = useProductContext()

  const statsData = [
    { title: "Total Revenue", value: "$12,450.00", icon: DollarSign, trend: "12", color: "green" },
    { title: "Total Orders", value: "148", icon: ClipboardList, trend: "8", color: "blue" },
    { title: "Products", value: products.length.toString(), icon: ShoppingBag, color: "purple" },
    { title: "Active Users", value: "1,240", icon: Users, trend: "4", color: "orange" }
  ]

  return (
    <div className="space-y-6">
      <div>
        <PageHeader 
          title="Dashboard Overview"
          description="Welcome back! Here is what's happening in your shop today."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index)=>(
          <StatsCard
            keuy={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            color={stat.color}
          />
        ))}
      </div>
    </div>
  )
}