import React, { useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import DataTable from '../../../common/DataTable'
import SearchBar from '../../../common/SearchBar'
import Button from '../../../common/Button'
import Modal from '../../../common/Modal'
import PageHeader from '../../../common/PageHeader'
import FilterBar from '../../../common/FilterBar'
import DeleteButton from '../../../common/DeleteButton'
import CategoryForm from '../components/CategoryForm'
import Pagination from '../../../common/Pagination'

const ITEMS_PER_PAGE = 5

export default function AdminCategories() {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState('newest')

  const [filters, setFilters] = useState({
    status: '',
  })

  const [categories, setCategories] = useState([
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
  ])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
    setCurrentPage(1)
  }

  const categoryFilters = [
    {
      key: 'status',
      options: ['All', 'Active', 'Inactive'],
    },
  ]

  const handleSubmitCategory = (data) => {
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

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingCategory(null)
  }

  const columns = [
    {
      header: 'Image',
      render: (row) =>
        row.image ? (
          <img
            src={row.image}
            alt={row.name}
            className="w-12 h-12 object-cover rounded-lg"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        ),
    },
    {
      header: 'Category Name',
      accessor: 'name',
    },
    {
      header: 'Slug',
      render: (row) => (
        <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
          {row.slug}
        </span>
      ),
    },
    {
      header: 'Products',
      accessor: 'productCount',
    },
    {
      header: 'Status',
      render: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.status === 'Active'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleEdit(row)}
            className="text-slate-400 hover:text-blue-600 transition-colors"
            title="Edit Category"
          >
            <Edit size={18} />
          </button>
          <DeleteButton
            onConfirm={() => handleDelete(row.id)}
            className="text-slate-400 hover:text-red-600 transition-colors"
          >
            <Trash2 size={18} />
          </DeleteButton>
        </div>
      ),
    },
  ]

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
    .sort((a, b) =>
    {
      if(sortOrder === 'newest') return b.id - a.id
      if(sortOrder === 'asc') return a.name.localeCompare(b.name)
        return b.name.localeCompare(a.name)
    }
    )

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE)
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="space-y-6">
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
      >
        <CategoryForm
          initialData={editingCategory}
          onSubmit={handleSubmitCategory}
        />
      </Modal>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Categories"
          description="Manage your product categories and taxonomy."
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FilterBar
            filters={categoryFilters}
            values={filters}
            onChange={handleFilterChange}
          />
          <select
            value={sortOrder}
            onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(1) }}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="asc">A → Z</option>
            <option value="desc">Z → A</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
            placeholder="Search categories..."
          />
          <Button
            variant="primary"
            onClick={() => {
              setEditingCategory(null)
              setIsModalOpen(true)
            }}
            className="shrink-0 whitespace-nowrap"
          >
            <Plus size={16} className="mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={paginatedCategories} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}