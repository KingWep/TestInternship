import { useState } from 'react'

const ITEMS_PER_PAGE = 5

const initialSlides = [
  {
    id: 1,
    tag: 'New Arrival',
    title: 'Summer Collection',
    description: 'Check out our latest summer collection with vibrant styles for the season!',
    discount: '20% Off',
    ctaText: 'Shop Now',
    ctaLink: '/shop/summer',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
  },
  {
    id: 2,
    tag: 'Limited Offer',
    title: 'Winter Sale',
    description: 'Get ready for winter with our exclusive sale on premium products!',
    discount: '30% Off',
    ctaText: 'Grab Deal',
    ctaLink: '/shop/winter',
    status: 'Inactive',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800',
  },
  {
    id: 3,
    tag: 'Best Seller',
    title: 'Skincare Essentials',
    description: 'Discover our top-rated skincare products loved by thousands of customers.',
    discount: '15% Off',
    ctaText: 'Explore',
    ctaLink: '/shop/skincare',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800',
  },
  {
    id: 4,
    tag: 'Flash Sale',
    title: 'Beauty Week',
    description: 'One week only — massive discounts across all beauty categories.',
    discount: '40% Off',
    ctaText: 'Shop Now',
    ctaLink: '/shop/beauty',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
  },
  {
    id: 5,
    tag: 'Exclusive',
    title: 'Luxury Perfume Collection',
    description: 'Indulge in our handpicked luxury fragrances from top global brands.',
    discount: '10% Off',
    ctaText: 'Discover',
    ctaLink: '/shop/perfume',
    status: 'Inactive',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
  },
  {
    id: 6,
    tag: 'Trending',
    title: 'Makeup Must-Haves',
    description: 'Trending looks and tools to elevate your everyday makeup routine.',
    discount: '25% Off',
    ctaText: 'Shop Now',
    ctaLink: '/shop/makeup',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800',
  },
]

export function useSlides() {
  const [slides, setSlides] = useState(initialSlides)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ status: '' })
  const [sortOrder, setSortOrder] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSlide, setEditingSlide] = useState(null)

  // ── Filter & Sort 
  const filteredSlides = slides
    .filter((slide) => {
      const keyword = search.toLowerCase()
      const matchSearch =
        slide.tag.toLowerCase().includes(keyword) ||
        slide.title.toLowerCase().includes(keyword) ||
        slide.description.toLowerCase().includes(keyword) ||
        String(slide.discount).toLowerCase().includes(keyword) ||
        slide.ctaText.toLowerCase().includes(keyword)

      const matchStatus =
        filters.status === '' ||
        filters.status === 'All' ||
        slide.status === filters.status

      return matchSearch && matchStatus
    })
    .sort((a, b) => {
      if (sortOrder === 'Newest First' || sortOrder === 'newest' || sortOrder === '') return b.id - a.id
      if (sortOrder === 'A → Z' || sortOrder === 'asc') return a.title.localeCompare(b.title)
      return b.title.localeCompare(a.title) // 'Z → A' or 'desc'
    })

  // ── Pagination 
  const totalPages = Math.ceil(filteredSlides.length / ITEMS_PER_PAGE)
  const paginatedSlides = filteredSlides.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // ── Handlers
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
      tag: data.tag,
      title: data.title,
      description: data.description || '',
      discount: data.discount || '',
      ctaText: data.ctaText || '',
      ctaLink: data.ctaLink || '',
      status: data.status || 'Active',
      image: data.image?.[0]
        ? URL.createObjectURL(data.image[0])
        : editingSlide
        ? editingSlide.image
        : '',
    }

    if (editingSlide) {
      setSlides((prev) =>
        prev.map((s) =>
          s.id === editingSlide.id ? { ...s, ...formattedData } : s
        )
      )
    } else {
      setSlides((prev) => [{ id: Date.now(), ...formattedData }, ...prev])
    }

    closeModal()
  }

  const handleEdit = (slide) => {
    setEditingSlide(slide)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    setSlides((prev) => prev.filter((s) => s.id !== id))
  }

  const openAddModal = () => {
    setEditingSlide(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingSlide(null)
  }

  return {
    // state
    slides,
    search,
    filters,
    sortOrder,
    currentPage,
    isModalOpen,
    editingSlide,
    // computed
    filteredSlides,
    paginatedSlides,
    totalPages,
    // handlers
    setCurrentPage,
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
