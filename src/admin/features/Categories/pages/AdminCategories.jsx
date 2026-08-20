import React from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { useCategories } from '../hooks/useCategories'
import CategoryForm from '../components/CategoryForm'
import DataTable from '../../../common/DataTable'
import SearchBar from '../../../common/SearchBar'
import Button from '../../../common/Button'
import Modal from '../../../common/Modal'
import PageHeader from '../../../common/PageHeader'
import FilterBar from '../../../common/FilterBar'
import DeleteButton from '../../../common/DeleteButton'
import Pagination from '../../../common/Pagination'

export default function AdminCategories() {
  const {
    search,
    filters,
    sortOrder,
    currentPage,
    isModalOpen,
    editingCategory,
    paginatedCategories,
    totalPages,
    setCurrentPage,
    handleFilterChange,
    handleSearchChange,
    handleSortChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    openAddModal,
    closeModal,
  } = useCategories()

  const categoryFilters = [
    {
      key: 'status',
      options: ['All', 'Active', 'Inactive'],
    },
  ]

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
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
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

  return (
    <div className="space-y-6">
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
      >
        <CategoryForm
          initialData={editingCategory}
          onSubmit={handleSubmit}
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
          <FilterBar
            filters={[{ key: 'sort', options: ['Newest First', 'A → Z', 'Z → A'] }]}
            values={{ sort: sortOrder }}
            onChange={(key, value) => handleSortChange({ target: { value } })}
          />
        </div>

        <div className="flex items-center gap-3">
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search categories..."
          />
          <Button
            variant="primary"
            onClick={() => openAddModal()}
            className="shrink-0 whitespace-nowrap"
          >
            <Plus size={16} className="mr-2" />
            Add Category
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
        <DataTable columns={columns} data={paginatedCategories} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}