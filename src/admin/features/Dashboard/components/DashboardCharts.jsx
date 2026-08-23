import React, { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/admin/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/admin/components/ui/chart'
import { useOrderContext } from '../../../../context/OrderContext'
import { useProductContext } from '../../../../context/ProductContext'

export default function DashboardCharts() {
  const { orders } = useOrderContext()
  const { products } = useProductContext()

  // Process data for Bar Chart (Total selling per month)
  const barChartData = useMemo(() => {
    const monthlySales = orders
      .filter((order) => order.paymentStatus === 'Paid')
      .reduce((acc, order) => {
        const date = new Date(order.date)
        const month = date.toLocaleString('default', { month: 'short' })
        const year = date.getFullYear()
        const key = `${month} ${year}`
        
        if (!acc[key]) {
          acc[key] = { month: key, total: 0 }
        }
        acc[key].total += Number(order.total || 0)
        return acc
      }, {})

    // Convert to array and sort if needed (simplifying for now, assuming order from data)
    return Object.values(monthlySales)
  }, [orders])

  const barChartConfig = {
    total: {
      label: "Total Sales",
      color: "hsl(var(--primary))",
    },
  }

  // Process data for Pie Chart (Product Stock Label)
  // Grouping by category
  const pieChartData = useMemo(() => {
    const stockByCategory = products.reduce((acc, product) => {
      const cat = product.category || 'Other'
      if (!acc[cat]) {
        acc[cat] = { name: cat, value: 0 }
      }
      acc[cat].value += Number(product.stock || 0)
      return acc
    }, {})

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']
    return Object.values(stockByCategory).map((item, index) => ({
      ...item,
      fill: COLORS[index % COLORS.length]
    }))
  }, [products])

  const pieChartConfig = {
    value: {
      label: "Stock",
    },
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Bar Chart: Total Selling Month */}
      <Card>
        <CardHeader>
          <CardTitle>Total Sales Per Month</CardTitle>
          <CardDescription>Monthly revenue overview</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barChartConfig} className="h-[300px] w-full">
            <BarChart data={barChartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.split(' ')[0]}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Pie Chart: Product Stock */}
      <Card>
        <CardHeader>
          <CardTitle>Product Stock by Category</CardTitle>
          <CardDescription>Current inventory distribution</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <ChartContainer config={pieChartConfig} className="h-[300px] w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
