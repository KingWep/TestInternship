import { useState, useMemo } from 'react'

// ─── Static data outside hook to avoid re-creation on every render ───────────
// Note: filterOptions is now derived dynamically inside the hook from dummyProducts.

const dummyProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    salePrice: 59.99,
    originalPrice: 79.99,
    savings: 20.00,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    category: 'Electronics',
    salePrice: 149.99,
    originalPrice: 199.99,
    savings: 50.00,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    salePrice: 35.00,
    originalPrice: 45.00,
    savings: 10.00,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
  },
  {
    id: 4,
    name: 'Wireless Mouse',
    category: 'Accessories',
    salePrice: 24.99,
    originalPrice: 34.99,
    savings: 10.00,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db',
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    category: 'Accessories',
    salePrice: 69.99,
    originalPrice: 89.99,
    savings: 20.00,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
  },
  {
    id: 6,
    name: 'USB-C Fast Charger',
    category: 'Accessories',
    salePrice: 19.99,
    originalPrice: 29.99,
    savings: 10.00,
    stock: 0,                 // out of stock — should be blocked from cart
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0',
  },
  {
    id: 7,
    name: 'Vitamin C Face Serum',
    category: 'Skincare',
    salePrice: 18.99,
    originalPrice: 24.99,
    savings: 6.00,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be',
  },
  {
    id: 8,
    name: 'Matte Lipstick',
    category: 'Makeup',
    salePrice: 12.99,
    originalPrice: 16.99,
    savings: 4.00,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
  },
  {
    id: 9,
    name: 'Luxury Perfume',
    category: 'Perfume',
    salePrice: 49.99,
    originalPrice: 69.99,
    savings: 20.00,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601',
  },
  {
    id: 10,
    name: 'Hair Repair Shampoo',
    category: 'Haircare',
    salePrice: 14.99,
    originalPrice: 19.99,
    savings: 5.00,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883',
  },
  {
    id: 11,
    name: 'Body Lotion',
    category: 'Bodycare',
    salePrice: 11.99,
    originalPrice: 15.99,
    savings: 4.00,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b',
  },
  {
    id: 12,
    name: 'Fashion Sunglasses',
    category: 'Accessories',
    salePrice: 29.99,
    originalPrice: 39.99,
    savings: 10.00,
    stock: 7,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
  },
]

// ─── Initial state helpers ────────────────────────────────────────────────────
const INITIAL_CUSTOMER = { name: '', phone: '' }
const INITIAL_PAYMENT = 'Cash'

// ─── Hook ─────────────────────────────────────────────────────────────────────
export default function useSalesForm() {
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ category: '' })

  // ── Dynamic category filter — derived from actual product data ───────────
  // Any time a product's category changes or a new product is added,
  // this list updates automatically. 'All' is always the first option.
  const filterOptions = useMemo(() => {
    const uniqueCategories = [
      'All',
      ...Array.from(new Set(dummyProducts.map((p) => p.category))).sort(),
    ]
    return [{ key: 'category', options: uniqueCategories }]
  }, []) // dummyProducts is module-level constant so no dep needed

  // ── Filter change handler — matches FilterBar's (key, value) signature ───
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }


  const handleAddToCart = (product) => {
    if (product.stock === 0) return // out-of-stock guard

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        // Do not exceed available stock
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

  // ── Remove item ──────────────────────────────────────────────────────────
  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  // ── Checkout ─────────────────────────────────────────────────────────────
  // Accepts final customer info & payment method from the page, then resets
  // all form state so the clerk is ready for the next sale immediately.
  const handleCheckout = ({ customerInfo, paymentMethod }) => {
    const order = {
      items: cart,
      subtotal,
      customerInfo,
      paymentMethod,
      createdAt: new Date().toISOString(),
    }
    // TODO: replace with real API call / order dispatch
    console.log('Order submitted:', order)

    // Reset all state
    setCart([])
    setSearch('')
    setFilters({ category: '' })

    return order
  }

  // ── Derived values ────────────────────────────────────────────────────────
  // Subtotal uses salePrice (the discounted price the customer pays).
  const subtotal = cart.reduce(
    (acc, item) => acc + item.salePrice * item.quantity,
    0
  )

  const filterProducts = dummyProducts.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchFilter =
      filters.category === '' ||
      filters.category === 'All' ||
      product.category === filters.category
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
    // Customer / payment defaults exposed so the page can reset them via handleCheckout
    INITIAL_CUSTOMER,
    INITIAL_PAYMENT,
  }
}
