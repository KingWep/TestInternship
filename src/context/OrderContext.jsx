import { createContext, useContext, useState } from 'react'

const OrderContext = createContext()

// ─── Shared initial orders ────────────────────────────────────────────────────
const INITIAL_ORDERS = [
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
    paymentMethod: 'Cash',
    date: '2026-08-20',
    time: '09:58:30',
    items: [],
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
    paymentMethod: 'Card',
    date: '2026-08-20',
    time: '10:30:00',
    items: [],
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
    paymentMethod: 'Cash',
    date: '2026-08-20',
    time: '11:15:00',
    items: [],
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
    paymentMethod: 'Cash',
    date: '2026-08-20',
    time: '09:58:30',
    items: [],
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
    paymentMethod: 'Card',
    date: '2026-08-20',
    time: '10:30:00',
    items: [],
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
    paymentMethod: 'Cash',
    date: '2026-08-20',
    time: '11:15:00',
    items: [],
  },
]

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(INITIAL_ORDERS)

  /**
   * Adds a new order from the SaleForm checkout.
   * Returns the newly created order object.
   */
  const addOrder = ({ items, subtotal, delivery, paymentMethod, customerInfo }) => {
    const now = new Date()
    const date = now.toISOString().split('T')[0]
    const time = now.toTimeString().split(' ')[0]

    // ── Generate sequential id (max existing numeric id + 1) ──────────────
    const maxId = orders.reduce((max, o) => {
      const n = parseInt(o.id, 10)
      return !isNaN(n) && n > max ? n : max
    }, 0)
    const nextId = String(maxId + 1)

    // ── Generate sequential orderNumber (max existing orderNumber + 1) ─────
    const maxNum = orders.reduce((max, o) => {
      const n = parseInt(o.orderNumber, 10)
      return n > max ? n : max
    }, 0)
    const orderNumber = String(maxNum + 1).padStart(5, '0')

    const total = (Number(subtotal) || 0) + (Number(delivery) || 0)

    const newOrder = {
      id: nextId,          // clean sequential: "7", "8", "9", ...
      orderNumber,         // zero-padded:      "00013", "00014", ...
      status: 'Pending',
      phone: customerInfo.phone,
      address: customerInfo.address,
      subtotal: Number(subtotal) || 0,
      delivery: Number(delivery) || 0,
      total,
      paymentStatus: 'Unpaid',
      paymentMethod: paymentMethod || 'Cash',
      date,
      time,
      items,
    }

    setOrders((prev) => [newOrder, ...prev])
    return newOrder
  }

  return (
    <OrderContext.Provider value={{ orders, setOrders, addOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrderContext() {
  return useContext(OrderContext)
}
