import React from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { useProducts, getStockStatus } from '../hooks/useProducts'
import ProductsForm from '../components/ProductForm'
import DataTable from '../../../common/DataTable'
import SearchBar from '../../../common/SearchBar'
import Button from '../../../common/Button'
import Modal from '../../../common/Modal'
import PageHeader from '../../../common/PageHeader'
import FilterBar from '../../../common/FilterBar'
import DeleteButton from '../../../common/DeleteButton'
import Pagination from '../../../common/Pagination'
import { useCategoryContext } from '../../../../context/CategoryContext'

export default function AdminProducts() {
  const { categories } = useCategoryContext()
  const {
    search,
    filters,
    sortOrder,
    currentPage,
    isModalOpen,
    editingProduct,
    paginatedProducts,
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
  } = useProducts()

  const columns = [
    {
      header: 'Image',
      render: (row) =>
        row.image ? (
          <img
            src={row.image}
            alt={row.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        ),
    },
    {
      header: 'Product Name',
      accessor: 'name',
    },
    {
      header: 'SKU',
      accessor: 'sku',
    },
    {
      header: 'Category',
      accessor: 'category',
    },
    {
      header: 'Discount',
      render: (row) =>
        Number(row.discount) > 0 ? (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700">
            ${Number(row.discount).toFixed(2)}
          </span>
        ) : (
          <span className="text-slate-400 text-sm">—</span>
        ),
    },
    {
      header: 'Price',
      render: (row) => (
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
          ${Number(row.price).toFixed(2)}
        </span>
      ),
    },
    {
      header: 'Stock',
      accessor: 'stock',
    },
    {
      header: 'Status',
      render: (row) => {
        const status = getStockStatus(row.stock)
        const styles = {
          'In Stock':     'bg-green-100 text-green-700',
          'Low Stock':    'bg-yellow-100 text-yellow-700',
          'Out of Stock': 'bg-red-100 text-red-700',
        }
        return (
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
            {status}
          </span>
        )
      },
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleEdit(row)}
            className="text-slate-400 hover:text-blue-600 transition-colors"
            title="Edit Product"
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

  const productFilters = [
    {
      key: 'category',
      options: ['All', ...categories.map(c => c.name)],
    },
    {
      key: 'status',
      options: ['All', 'In Stock', 'Low Stock', 'Out of Stock'],
    },
  ]

  return (
    <div className="space-y-6">
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingProduct ? "Edit Product" : "Add New Product"}
      >
        <ProductsForm
          initialData={editingProduct}
          onSubmit={handleSubmit}
        />
      </Modal>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Products"
          description="Manage your product catalog, pricing, and stock inventory."
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <FilterBar
            filters={productFilters}
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
            placeholder="Search products..."
          />
          <Button
            variant="primary"
            onClick={() => openAddModal()}
            className="shrink-0 whitespace-nowrap"
          >
            <Plus size={16} className="mr-2" />
            Add Product
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
        <DataTable columns={columns} data={paginatedProducts} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}