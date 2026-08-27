import { useState } from 'react'
import { useCategoryContext } from '../../../../context/CategoryContext'
import axiosClient from '../../../../api/axiosClient'
import { API_ENDPOINTS } from '../../../../api/endpoints'
import Swal from 'sweetalert2'

const ITEMS_PER_PAGE = 5

export function useCategories() {
  const { categories, setCategories, fetchCategories, isLoading: isCategoriesLoading } = useCategoryContext()
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ status: '' })
  const [sortOrder, setSortOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ── Filter & Sort
  const filteredCategories = (categories || [])
    .filter((category) => {
      const matchSearch = category.name
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchStatus =
        filters.status === '' ||
        filters.status === 'ទាំងអស់' ||
        (category.status && category.status === filters.status)

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

  const handleSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const payload = {
        name: data.name,
        slug: data.slug,
        description: data.description || '',
      }

      if (editingCategory) {
        payload.id = editingCategory.id
        await axiosClient.put(API_ENDPOINTS.CATEGORIES.UPDATE(editingCategory.id), payload)
        Swal.fire({
          icon: 'success',
          title: 'ជោគជ័យ',
          text: 'Category updated successfully!',
          timer: 1500,
          showConfirmButton: false
        })
      } else {
        await axiosClient.post(API_ENDPOINTS.CATEGORIES.CREATE, payload)
        Swal.fire({
          icon: 'success',
          title: 'ជោគជ័យ',
          text: 'Category added successfully!',
          timer: 1500,
          showConfirmButton: false
        })
      }
      await fetchCategories()
      closeModal()
    } catch (error) {
      const errorData = error?.response?.data
      const backendMsg = errorData?.message || errorData?.error || JSON.stringify(errorData) || error.message
      console.error('Error saving category:', error)
      Swal.fire({
        icon: 'error',
        title: `Error ${error?.response?.status || ''}`,
        text: backendMsg,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'តើអ្នកប្រាកដទេ?',
      text: "អ្នកនឹងមិនអាចទាញទិន្នន័យនេះមកវិញបានទេ!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'បាទ/ចាស លុបវា',
      cancelButtonText: 'បោះបង់'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosClient.delete(API_ENDPOINTS.CATEGORIES.DELETE(id))
          await fetchCategories()
          Swal.fire('លុបបានជោគជ័យ!', 'ទិន្នន័យត្រូវបានលុប.', 'success')
        } catch (error) {
          console.error('Error deleting category:', error)
          Swal.fire('បរាជ័យ!', 'មានបញ្ហាក្នុងការលុបទិន្នន័យ.', 'error')
        }
      }
    })
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
    isSubmitting,
    isCategoriesLoading,
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
