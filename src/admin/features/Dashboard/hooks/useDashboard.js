import { useLowStockProductsQuery } from '../../../../queries/products/useProductQueries'
import { useOrdersQuery, useOrderStats } from '../../../../queries/orders/useOrderQueries'
import { AlertTriangle, ClipboardList, Trophy, DollarSign } from 'lucide-react'

export default function useDashboard() {
    const { totalLowStockProducts } = useLowStockProductsQuery()
    const { data: orders = [] } = useOrdersQuery()
    const { totalRevenue, topSellingProducts } = useOrderStats()

    const statsData = [
        {   title: "ចំណូលសរុប", 
            value: `$${Number(totalRevenue || 0).toFixed(2)}`, 
            icon: DollarSign, 
            trend: "12", 
            color: "green" ,
            link: "/admin"},
        { title: "ការបញ្ជាទិញសរុប", value: orders.length.toString(), icon: ClipboardList, trend: "8", color: "blue", link: "/admin/orders" },
        {
            title: "ផលិតផលស្តុកតិច",
            value: totalLowStockProducts?.toString() || "0",
            icon: AlertTriangle,
            color: "amber",
            warning: totalLowStockProducts > 0,
            note: "ត្រូវការបន្ថែមស្តុក",
            link: "/admin/products",
        },
        {
            title: "ផលិតផលលក់ដាច់បំផុត",
            value: topSellingProducts.length.toString(),
            icon: Trophy,
            color: "purple",
            note: topSellingProducts.length === 0 ? "មិនទាន់មានទិន្នន័យលក់ទេ" : undefined,
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