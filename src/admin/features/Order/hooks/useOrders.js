import { useState } from 'react'
import Swal from 'sweetalert2'
import { useOrderContext } from '../../../../context/OrderContext'
import { orderService } from '../../../../services/orderService'

export function useOrders() {
  // ── Pull shared orders from context (includes orders added from SaleForm) ──
  const { orders, refreshOrders } = useOrderContext()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [paymentFilter, setPaymentFilter] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingOrder, setEditingOrder] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handlers
  const openEditModal = (order) => {
    setEditingOrder(order)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingOrder(null)
  }

  const handleUpdateSubmit = async (formData) => {
    if (!editingOrder) return
    setIsSubmitting(true)
    
    try {
      await orderService.updateOrder(editingOrder.id, formData)
      
      Swal.fire({
        icon: 'success',
        title: 'ជោគជ័យ',
        text: 'Order updated successfully!',
        timer: 1500,
        showConfirmButton: false
      })
      
      closeModal()
      // Refresh the orders list to get the updated data
      if (refreshOrders) {
        refreshOrders()
      }
    } catch (error) {
      console.error('Update error:', error)
      const errorMsg = error?.response?.data?.message || error.message || 'Error updating order'
      Swal.fire({
        icon: 'error',
        title: 'បរាជ័យ!',
        text: errorMsg,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
      const orderDate = new Date(order.createdAt || order.createAt)
      if (fromDate) {
        matchesDate = matchesDate && orderDate >= new Date(fromDate)
      }
      if (toDate) {
        const to = new Date(toDate)
        to.setHours(23, 59, 59, 999)
        matchesDate = matchesDate && orderDate <= to
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
    setPaymentFilter,
    isModalOpen,
    editingOrder,
    isSubmitting,
    openEditModal,
    closeModal,
    handleUpdateSubmit
  }
}
