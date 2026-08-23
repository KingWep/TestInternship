import { useProductContext } from '../../../../context/ProductContext'
import { useOrderContext } from '../../../../context/OrderContext'
import { AlertTriangle, ClipboardList, Trophy, DollarSign } from 'lucide-react'

export default function useDashboard() {
    const { products, lowStockProducts } = useProductContext()
    const { orders, totalRevenue, topSellingProducts } = useOrderContext()

    const statsData = [
        { title: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, trend: "12", color: "green" , link: "/admin"},
        { title: "Total Orders", value: orders.length.toString(), icon: ClipboardList, trend: "8", color: "blue", link: "/admin/orders" },
        {
            title: "Low Stock Products",
            value: lowStockProducts.length.toString(),
            icon: AlertTriangle,
            color: "amber",
            warning: lowStockProducts.length > 0,
            note: "Needs restocking",
            link: "/admin/products",
        },
        {
            title: "Top Selling Products",
            value: topSellingProducts.length.toString(),
            icon: Trophy,
            color: "purple",
            note: topSellingProducts.length === 0 ? "No sales data yet" : undefined,
            link: "/admin/products",
        },
    ]

    const recentOrders = [...orders]
        .sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateB - dateA;
        })
        .slice(0, 10);

    return { statsData, recentOrders }
}