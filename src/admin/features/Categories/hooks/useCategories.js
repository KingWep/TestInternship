import { useState } from 'react'

const ITEMS_PER_PAGE = 5

const initialCategories = [
  {
    id: 1,
    name: 'Cosmetic',
    slug: 'cosmetic',
    status: 'Active',
    description: 'Beauty and cosmetic products.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500',
    productCount: 8,
  },
  {
    id: 2,
    name: 'Skincare',
    slug: 'skincare',
    status: 'Active',
    description: 'Skin nourishing and care products.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500',
    productCount: 14,
  },
  {
    id: 3,
    name: 'Body Care',
    slug: 'body-care',
    status: 'Active',
    description: 'Full body care essentials.',
    image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500',
    productCount: 6,
  },
  {
    id: 4,
    name: 'Hair Care',
    slug: 'hair-care',
    status: 'Inactive',
    description: 'Hair treatment and styling products.',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500',
    productCount: 3,
  },
  {
    id: 5,
    name: 'Makeup',
    slug: 'makeup',
    status: 'Active',
    description: 'Cosmetics for face, eyes, and lips.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500',
    productCount: 22,
  },
  {
    id: 6,
    name: 'Fragrance',
    slug: 'fragrance',
    status: 'Active',
    description: 'Perfumes, colognes, and body mists.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500',
    productCount: 15,
  },
  {
    id: 7,
    name: 'Nail Care',
    slug: 'nail-care',
    status: 'Active',
    description: 'Nail polishes, tools, and treatments.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500',
    productCount: 9,
  },
  {
    id: 8,
    name: "Men's Grooming",
    slug: 'mens-grooming',
    status: 'Inactive',
    description: 'Skincare and shaving products for men.',
    image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=500',
    productCount: 4,
  },
  {
    id: 9,
    name: 'Sun Care',
    slug: 'sun-care',
    status: 'Active',
    description: 'Sunscreens and after-sun recovery lotions.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
    productCount: 7,
  },
  {
    id: 10,
    name: 'Oral Care',
    slug: 'oral-care',
    status: 'Active',
    description: 'Dental hygiene and teeth whitening kits.',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=500',
    productCount: 5,
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
