import { useState } from 'react'

const ITEMS_PER_PAGE = 5

const initialCategories = [
  {
    id: 1,
    name: 'Cosmetic',
    slug: 'cosmetic',
    status: 'Active',
    description: 'Beauty and cosmetic products.',
    image: 'https://i.pinimg.com/736x/0f/cc/03/0fcc03cfdb519e20f69e9699e2f8cdd0.jpg',
    productCount: 8,
  },
  {
    id: 2,
    name: 'Skincare',
    slug: 'skincare',
    status: 'Active',
    description: 'Skin nourishing and care products.',
    image: 'https://i.pinimg.com/736x/0f/cc/03/0fcc03cfdb519e20f69e9699e2f8cdd0.jpg',
    productCount: 14,
  },
  {
    id: 3,
    name: 'Body Care',
    slug: 'body-care',
    status: 'Active',
    description: 'Full body care essentials.',
    image: 'https://i.pinimg.com/736x/0f/cc/03/0fcc03cfdb519e20f69e9699e2f8cdd0.jpg',
    productCount: 6,
  },
  {
    id: 4,
    name: 'Hair Care',
    slug: 'hair-care',
    status: 'Inactive',
    description: 'Hair treatment and styling products.',
    image: 'https://i.pinimg.com/736x/0f/cc/03/0fcc03cfdb519e20f69e9699e2f8cdd0.jpg',
    productCount: 3,
  },
]

export function useCategories() {
  const [categories, setCategories] = useState(initialCategories)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ status: '' })
  const [sortOrder, setSortOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  // ── Filter & Sort
  const filteredCategories = categories
    .filter((category) => {
      const matchSearch = category.name
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchStatus =
        filters.status === '' ||
        filters.status === 'All' ||
        category.status === filters.status

      return matchSearch && matchStatus
    })
    .sort((a, b) => {
      if (sortOrder === 'Newest First' || sortOrder === 'newest' || sortOrder === '') return b.id - a.id
      if (sortOrder === 'A → Z' || sortOrder === 'asc') return a.name.localeCompare(b.name)
      return b.name.localeCompare(a.name) // 'Z → A' or 'desc'
    })

  // ── Pagination─────
  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE)
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // ── Handlers───────
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
    const formattedData = {
      name: data.name,
      slug: data.slug,
      status: data.status,
      description: data.description || '',
      image: data.image?.[0]
        ? URL.createObjectURL(data.image[0])
        : editingCategory
        ? editingCategory.image
        : '',
      productCount: editingCategory ? editingCategory.productCount : 0,
    }

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id ? { ...c, ...formattedData } : c
        )
      )
    } else {
      setCategories((prev) => [
        ...prev,
        { id: Date.now(), ...formattedData },
      ])
    }

    closeModal()
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  const openAddModal = () => {
    setEditingCategory(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingCategory(null)
  }

  return {
    // state
    categories,
    search,
    filters,
    sortOrder,
    currentPage,
    isModalOpen,
    editingCategory,
    // computed
    filteredCategories,
    paginatedCategories,
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
