import { useProductContext } from '../../../../context/ProductContext'
import { useOrderContext } from '../../../../context/OrderContext'
import { AlertTriangle, ClipboardList, Trophy, DollarSign } from 'lucide-react'

export default function useDashboard() {
    const { products, lowStockProducts } = useProductContext()
    const { orders, totalRevenue, topSellingProducts } = useOrderContext()

    const statsData = [
        { title: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, trend: "12", color: "green" },
        { title: "Total Orders", value: orders.length.toString(), icon: ClipboardList, trend: "8", color: "blue" },
        {
            title: "Low Stock Products",
            value: lowStockProducts.length.toString(),
            icon: AlertTriangle,
            color: "amber",
            warning: lowStockProducts.length > 0,
            note: "Needs restocking",
        },
        {
            title: "Top Selling Products",
            value: topSellingProducts.length.toString(),
            icon: Trophy,
            color: "purple",
            note: topSellingProducts.length === 0 ? "No sales data yet" : undefined,
        },
    ]

    return { statsData }
}