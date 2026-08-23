import { useState } from 'react'
import { useProductContext } from '../../../../context/ProductContext'

const ITEMS_PER_PAGE = 5

export function getStockStatus(stock) {
  if (stock === 0) return 'Out of Stock'
  if (stock <= 10) return 'Low Stock'
  return 'In Stock'
}

export function useProducts() {
  const { products, setProducts } = useProductContext()
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ category: '', status: '' })
  const [sortOrder, setSortOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  // ── Filter & Sort ──────────────────────────────────────────────────────────
  const filteredProducts = products
    .filter((product) => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchCategory =
        filters.category === '' ||
        filters.category === 'All' ||
        product.category === filters.category

      const matchStatus =
        filters.status === '' ||
        filters.status === 'All' ||
        getStockStatus(product.stock) === filters.status

      return matchSearch && matchCategory && matchStatus
    })
    .sort((a, b) => {
      if (sortOrder === 'Newest First' || sortOrder === 'newest' || sortOrder === '') return b.id - a.id
      if (sortOrder === 'A → Z' || sortOrder === 'asc') return a.name.localeCompare(b.name)
      return b.name.localeCompare(a.name)
    })

  // ── Pagination ─────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  const handleSortChange = (e) => {
    setSortOrder(e.target.value)
    setCurrentPage(1)
  }

  const handleSubmit = (data) => {
    // Build the combined images array:
    // 1. Keep any existing URL images the user did not remove
    const keptExisting = Array.isArray(data.existingImages) ? data.existingImages : []
    // 2. Convert newly uploaded File objects to object URLs
    const newImageUrls = Array.isArray(data.images)
      ? data.images.map((f) => URL.createObjectURL(f))
      : []

    const allImages = [...keptExisting, ...newImageUrls]

    const formattedData = {
      name: data.name,
      sku: data.sku,
      category: data.category,
      price: Number(data.price) || 0,
      oldPrice: Number(data.oldPrice) || 0,
      discount: Number(data.discount) || 0,
      stock: Number(data.stock) || 0,
      description: data.description || '',
      // Multi-image array
      images: allImages,
      // Backward-compatible single image for table display
      image: allImages[0] ?? (editingProduct ? editingProduct.image : ''),
    }

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...formattedData } : p
        )
      )
    } else {
      setProducts((prev) => [{ id: Date.now(), ...formattedData }, ...prev])
    }

    closeModal()
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const openAddModal = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  return {
    // state
    products,
    search,
    filters,
    sortOrder,
    currentPage,
    isModalOpen,
    editingProduct,
    // computed
    filteredProducts,
    paginatedProducts,
    totalPages,
    // raw setters (for inline handlers in the page)
    setSearch,
    setSortOrder,
    setCurrentPage,
    // handlers
    handleFilterChange,
    handleSearchChange,
    handleSortChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    openAddModal,
    closeModal,
  }
}
