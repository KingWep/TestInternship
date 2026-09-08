import { useState } from 'react'
import {
  useDeliveryProvidersQuery,
  useCreateDeliveryProviderMutation,
  useUpdateDeliveryProviderMutation,
  useDeleteDeliveryProviderMutation
} from '../../../../queries/deliveryProviders/useDeliveryProviderQueries'
import Swal from 'sweetalert2'

const ITEMS_PER_PAGE = 5

export function useDeliveryProviders() {
  const { data: providers = [], isLoading: isProvidersLoading } = useDeliveryProvidersQuery()
  const createMutation = useCreateDeliveryProviderMutation()
  const updateMutation = useUpdateDeliveryProviderMutation()
  const deleteMutation = useDeleteDeliveryProviderMutation()

  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ is_active: '' })
  const [sortOrder, setSortOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProvider, setEditingProvider] = useState(null)
  
  const isSubmitting = createMutation.isPending || updateMutation.isPending

  const filteredProviders = (providers || [])
    .filter((provider) => {
      const matchSearch = provider.name
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchStatus =
        filters.is_active === '' ||
        filters.is_active === 'ទាំងអស់' ||
        (filters.is_active === 'Active' && provider.is_active == 1) ||
        (filters.is_active === 'Inactive' && provider.is_active == 0)

      return matchSearch && matchStatus
    })
    .sort((a, b) => {
      if (sortOrder === 'Newest First' || sortOrder === 'newest' || sortOrder === '') return b.id - a.id
      if (sortOrder === 'A → Z' || sortOrder === 'asc') return a.name.localeCompare(b.name)
      return b.name.localeCompare(a.name) // 'Z → A' or 'desc'
    })

  const totalPages = Math.ceil(filteredProviders.length / ITEMS_PER_PAGE)
  const paginatedProviders = filteredProviders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

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
    try {
      const payload = new FormData()
      payload.append('name', data.name)
      payload.append('phone', data.phone)
      payload.append('shipping_fee', data.shipping_fee)
      payload.append('is_active', data.is_active ? 1 : 0)
      
      if (data.logo instanceof File) {
        payload.append('logo', data.logo)
      }

      if (editingProvider) {
        payload.append('id', editingProvider.id)
        await updateMutation.mutateAsync({ id: editingProvider.id, data: payload })
        Swal.fire({
          icon: 'success',
          title: 'ជោគជ័យ',
          text: 'ធ្វើបច្ចុប្បន្នភាពបានជោគជ័យ!',
          timer: 1500,
          showConfirmButton: false
        })
      } else {
        await createMutation.mutateAsync(payload)
        Swal.fire({
          icon: 'success',
          title: 'ជោគជ័យ',
          text: 'បន្ថែមបានជោគជ័យ!',
          timer: 1500,
          showConfirmButton: false
        })
      }
      closeModal()
    } catch (error) {
      const errorData = error?.response?.data
      const backendMsg = errorData?.message || errorData?.error || JSON.stringify(errorData) || error.message
      console.error('Error saving provider:', error)
      Swal.fire({
        icon: 'error',
        title: `បរាជ័យ ${error?.response?.status || ''}`,
        text: backendMsg,
      })
    }
  }

  const handleEdit = (provider) => {
    setEditingProvider(provider)
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
          await deleteMutation.mutateAsync(id)
          Swal.fire('លុបបានជោគជ័យ!', 'ទិន្នន័យត្រូវបានលុប.', 'success')
        } catch (error) {
          console.error('Error deleting provider:', error)
          Swal.fire('បរាជ័យ!', 'មានបញ្ហាក្នុងការលុបទិន្នន័យ.', 'error')
        }
      }
    })
  }

  const openAddModal = () => {
    setEditingProvider(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProvider(null)
  }

  return {
    providers,
    search,
    filters,
    sortOrder,
    currentPage,
    isModalOpen,
    editingProvider,
    isSubmitting,
    isProvidersLoading,
    filteredProviders,
    paginatedProviders,
    totalPages,
    setSearch,
    setSortOrder,
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
