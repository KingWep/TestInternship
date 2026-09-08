import React, { useState } from 'react'
import { Plus, Edit, Trash2, SlidersHorizontal, Ban, CheckCircle2, XCircle } from 'lucide-react'
import { useDeliveryProviders } from '../hooks/useDeliveryProviders'
import DeliveryProviderForm from '../components/DeliveryProviderForm'
import DataTable from '../../../components/common/DataTable'
import DataTableSkeleton from '../../../components/common/DataTableSkeleton'
import SearchBar from '../../../components/common/SearchBar'
import Button from '../../../components/common/Button'
import Modal from '../../../components/common/Modal'
import PageHeader from '../../../components/common/PageHeader'
import FilterBar from '../../../components/common/FilterBar'
import DeleteButton from '../../../components/common/DeleteButton'
import Pagination from '../../../components/common/Pagination'

export default function AdminDeliveryProviders() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const {
    search,
    filters,
    sortOrder,
    currentPage,
    isModalOpen,
    editingProvider,
    paginatedProviders,
    totalPages,
    isProvidersLoading,
    setCurrentPage,
    handleFilterChange,
    handleSearchChange,
    handleSortChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    openAddModal,
    closeModal,
  } = useDeliveryProviders()

  const providerFilters = [
    {
      key: 'is_active',
      options: ['ទាំងអស់', 'Active', 'Inactive'],
    },
  ]

  const columns = [
    {
      header: 'Logo',
      render: (row) => (
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 bg-white">
          {row.logo ? (
            <img
              src={row.logo}
              alt={row.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-50 flex items-center justify-center">
              <Ban size={20} className="text-gray-300" />
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'ឈ្មោះអ្នកដឹកជញ្ជូន',
      accessor: 'name',
    },
    {
      header: 'លេខទូរស័ព្ទ',
      render: (row) => (
        <span className="text-slate-600">{row.phone}</span>
      ),
    },
    {
      header: 'តម្លៃសេវាដឹក',
      render: (row) => (
        <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
          ${parseFloat(row.shipping_fee || 0).toFixed(2)}
        </span>
      ),
    },
    {
      header: 'ស្ថានភាព',
      render: (row) => (
        <div className="flex items-center">
          {row.is_active == 1 ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200">
              <CheckCircle2 size={14} /> Active
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-200">
              <XCircle size={14} /> Inactive
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'សកម្មភាព',
      align: 'right',
      render: (row) => (
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => handleEdit(row)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-amber-500 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600 transition-all"
            title="កែប្រែ"
          >
            <Edit size={18} />
          </button>
          <DeleteButton
            onConfirm={() => handleDelete(row.id)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-red-500 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
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
        title={editingProvider ? 'កែប្រែអ្នកដឹកជញ្ជូន' : 'បន្ថែមអ្នកដឹកជញ្ជូនថ្មី'}
      >
        <DeliveryProviderForm
          initialData={editingProvider}
          onSubmit={handleSubmit}
        />
      </Modal>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="អ្នកដឹកជញ្ជូន"
          description="គ្រប់គ្រងអ្នកដឹកជញ្ជូន និងតម្លៃសេវាដឹកជញ្ជូន។"
        />
      </div>

      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="hidden md:flex flex-wrap items-center gap-4">
            <FilterBar
              filters={providerFilters}
              values={filters}
              onChange={handleFilterChange}
            />
            <FilterBar
              filters={[{ key: 'sort', options: ['ថ្មីបំផុតមុន', 'A → Z', 'Z → A'] }]}
              values={{ sort: sortOrder }}
              onChange={(key, value) => handleSortChange({ target: { value } })}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <SearchBar
              value={search}
              onChange={handleSearchChange}
              placeholder="ស្វែងរកអ្នកដឹកជញ្ជូន..."
              className="w-full max-w-sm"
            />

            <Button
              variant="primary"
              onClick={() => openAddModal()}
              className="shrink-0 whitespace-nowrap h-[42px] px-5"
            >
              <Plus size={16} className="mr-2" />
              <span className="hidden md:inline">បន្ថែមអ្នកដឹកជញ្ជូន</span>
              <span className="md:hidden">បន្ថែម</span>
            </Button>

            <button
              type="button"
              onClick={() => setShowAdvancedFilters(prev => !prev)}
              className={`md:hidden shrink-0 w-10 py-2.5 flex items-center justify-center rounded-xl border transition-colors ${
                showAdvancedFilters
                  ? 'bg-slate-100 border-slate-300 text-slate-700'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
              title="បង្ហាញតម្រង"
              aria-label="បង្ហាញតម្រង"
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>

        <div
          className={`grid transition-all duration-300 ease-in-out md:hidden ${
            showAdvancedFilters ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 !mt-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-nowrap overflow-x-auto justify-between items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <FilterBar
                filters={providerFilters}
                values={filters}
                onChange={handleFilterChange}
              />
              <FilterBar
                filters={[{ key: 'sort', options: ['ថ្មីបំផុតមុន', 'A → Z', 'Z → A'] }]}
                values={{ sort: sortOrder }}
                onChange={(key, value) => handleSortChange({ target: { value } })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
        {isProvidersLoading ? (
          <DataTableSkeleton columns={columns.length} rows={5} />
        ) : (
          <>
            <DataTable columns={columns} data={paginatedProviders} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  )
}
