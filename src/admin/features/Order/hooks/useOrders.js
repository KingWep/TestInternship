import { useState } from 'react'
import { useOrderContext } from '../../../../context/OrderContext'

export function useOrders() {
  // ── Pull shared orders from context (includes orders added from SaleForm) ──
  const { orders } = useOrderContext()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [paymentFilter, setPaymentFilter] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  // Filter logic
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      search === '' ||
      order.orderNumber.includes(search) ||
      order.phone.includes(search)
    const matchesStatus =
      statusFilter === '' || statusFilter === 'ទាំងអស់ (All)' || order.status === statusFilter
    const matchesPayment =
      paymentFilter === '' || paymentFilter === 'ទាំងអស់ (All)' || order.paymentStatus === paymentFilter

    let matchesDate = true
    if (fromDate || toDate) {
      const orderDate = new Date(order.date)
      if (fromDate) {
        matchesDate = matchesDate && orderDate >= new Date(fromDate)
      }
      if (toDate) {
        matchesDate = matchesDate && orderDate <= new Date(toDate)
      }
    }

    return matchesSearch && matchesStatus && matchesPayment && matchesDate
  })

  return {
    orders: filteredOrders,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    paymentFilter,
    setPaymentFilter
  }
}
