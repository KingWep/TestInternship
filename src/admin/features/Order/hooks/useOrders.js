import { useState } from 'react'

export function useOrders() {
  const [orders, setOrders] = useState([
    { 
      id: '1', 
      orderNumber: '00007', 
      status: 'Pending', 
      phone: '0965134829', 
      address: 'ssssssssss', 
      subtotal: 113.00, 
      delivery: 0.01, 
      total: 113.01,
      paymentStatus: 'Unpaid',
      date: '2026-08-20',
      time: '09:58:30'
    },
    { 
      id: '2', 
      orderNumber: '00008', 
      status: 'Completed', 
      phone: '012345678', 
      address: 'Phnom Penh', 
      subtotal: 50.00, 
      delivery: 1.50, 
      total: 51.50,
      paymentStatus: 'Paid',
      date: '2026-08-20',
      time: '10:30:00'
    },
    { 
      id: '3', 
      orderNumber: '00009', 
      status: 'Cancelled', 
      phone: '098765432', 
      address: 'Siem Reap', 
      subtotal: 25.00, 
      delivery: 2.00, 
      total: 27.00,
      paymentStatus: 'Unpaid',
      date: '2026-08-20',
      time: '11:15:00'
    },
    { 
      id: '4', 
      orderNumber: '000010', 
      status: 'Pending', 
      phone: '0965134829', 
      address: 'ssssssssss', 
      subtotal: 113.00, 
      delivery: 0.01, 
      total: 113.01,
      paymentStatus: 'Unpaid',
      date: '2026-08-20',
      time: '09:58:30'
    },
    { 
      id: '5', 
      orderNumber: '000011', 
      status: 'Completed', 
      phone: '012345678', 
      address: 'Phnom Penh', 
      subtotal: 50.00, 
      delivery: 1.50, 
      total: 51.50,
      paymentStatus: 'Paid',
      date: '2026-08-20',
      time: '10:30:00'
    },
    { 
      id: '6', 
      orderNumber: '000012', 
      status: 'Cancelled', 
      phone: '098765432', 
      address: 'Siem Reap', 
      subtotal: 25.00, 
      delivery: 2.00, 
      total: 27.00,
      paymentStatus: 'Unpaid',
      date: '2026-08-20',
      time: '11:15:00'
    }
  ])

  // In the future, you can add state for filters, search, and pagination here.
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ទាំងអស់ (All)')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  // Filter logic can be added here as needed
  const filteredOrders = orders.filter(order => {
    const matchesSearch = search === '' || order.orderNumber.includes(search) || order.phone.includes(search)
    const matchesStatus = statusFilter === 'ទាំងអស់ (All)' || order.status === statusFilter
    
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

    return matchesSearch && matchesStatus && matchesDate
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
    setToDate
  }
}
