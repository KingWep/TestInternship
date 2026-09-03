import { useState, useMemo } from 'react'
import Swal from 'sweetalert2'
import { useCreateOrderMutation } from '../../../../queries/orders/useOrderQueries'
import { sendOrderToTelegram } from '../../../../services/telegramService'

import { useProductsQuery } from '../../../../queries/products/useProductQueries'
import { useCategoriesQuery } from '../../../../queries/categories/useCategoryQueries'

// ─── Initial state helpers ─────
const INITIAL_CUSTOMER = { name: '', phone: '', address: '', deliveryFee: '' }

// ─── Hook ──
export default function useSalesForm() {
  const { data: products = [], isPending: isProductsLoading } = useProductsQuery()
  const { data: categories = [], isPending: isCategoriesLoading } = useCategoriesQuery()
  const createOrderMutation = useCreateOrderMutation()
  const isLoading = isProductsLoading || isCategoriesLoading

  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ category: '' })

  // ── Dynamic category filter 
  const filterOptions = useMemo(() => {
    const uniqueCategories = ['ទាំងអស់', ...categories.map(c => c.name)]
    return [{ key: 'category', options: uniqueCategories, searchable: true }]
  }, [categories])

  // ── Filter change handler ──
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleAddToCart = (product) => {
    if (product.stock === 0) return

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        if (existing.quantity >= product.stock) return prev
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const handleUpdateQuantity = (id, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id))
      return
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const capped = Math.min(qty, item.stock)
        return { ...item, quantity: capped }
      })
    )
  }

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  // ── Checkout with validation & SweetAlert2 
  const handleCheckout = async ({ customerInfo }) => {
    if (cart.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Cart is Empty!',
        text: 'Please add at least one product before placing an order.',
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'Got it',
      })
      return null
    }

    // ── All valid → create order via context ───
    let newOrder;
    try {
      newOrder = await createOrderMutation.mutateAsync({
        items: cart,
        subtotal,
        delivery: Number(customerInfo.deliveryFee) || 0,
        customerInfo,
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'បរាជ័យ (Failed)',
        text: 'មានបញ្ហាក្នុងការបង្កើតការបញ្ជាទិញ។',
        confirmButtonColor: '#3b82f6',
      })
      return null
    }

    // ── Reset state ─
    setCart([])
    setSearch('')
    setFilters({ category: '' })

    // ── Send Telegram Message ──
    try {
      await sendOrderToTelegram(newOrder)
    } catch (err) {
      console.error('Failed to send order to Telegram:', err)
    }

    // ── Success alert ──────
    Swal.fire({
      icon: 'success',
      title: 'Order Placed Successfully!🎉',
      confirmButtonColor: '#3b82f6',
      confirmButtonText: 'Great!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
    })

    return newOrder
  }

  // ── Derived values ──
  const subtotal = cart.reduce(
    (acc, item) => acc + (item.salePrice || 0) * item.quantity,
    0
  )

  const filterProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchFilter =
      !filters.category ||
      filters.category === 'All' ||
      filters.category === 'ទាំងអស់' ||
      product.categoryName === filters.category
    return matchSearch && matchFilter
  })

  return {
    // Search & filter
    search,
    setSearch,
    filters,
    handleFilterChange,
    filterOptions,
    filterProducts,
    // Cart
    cart,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleCheckout,
    // Summary
    subtotal,
    // Customer defaults
    INITIAL_CUSTOMER,
    isLoading
  }
}
