import React, { useState } from 'react'
import { Plus, Edit, Trash2, SlidersHorizontal } from 'lucide-react'
import { useCategories } from '../hooks/useCategories'
import CategoryForm from '../components/CategoryForm'
import DataTable from '../../../components/common/DataTable'
import SearchBar from '../../../components/common/SearchBar'
import Button from '../../../components/common/Button'
import Modal from '../../../components/common/Modal'
import PageHeader from '../../../components/common/PageHeader'
import FilterBar from '../../../components/common/FilterBar'
import DeleteButton from '../../../components/common/DeleteButton'
import Pagination from '../../../components/common/Pagination'

export default function AdminCategories() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

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
      options: ['ទាំងអស់', 'Active', 'Inactive'],
    },
  ]

  const columns = [
    {
      header: 'រូបភាព',
      render: (row) =>
        row.image ? (
          <img
            src={row.image}
            alt={row.name}
            className=" h-16 w-16 min-w-[4rem] object-cover rounded-lg"
          />
        ) : (
          <div className="h-16 w-16 min-w-[4rem] bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
            គ្មានរូបភាព
          </div>
        ),
    },
    {
      header: 'ឈ្មោះប្រភេទ',
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
      header: 'ផលិតផល',
      accessor: 'productCount',
    },
    {
      header: 'ស្ថានភាព',
      render: (row) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${row.status === 'Active'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
            }`}
        >
          {row.status === 'Active' ? 'សកម្ម' : 'អសកម្ម'}
        </span>
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
            title="កែប្រែប្រភេទ"
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
        title={editingCategory ? 'កែប្រែប្រភេទ' : 'បន្ថែមប្រភេទថ្មី'}
      >
        <CategoryForm
          initialData={editingCategory}
          onSubmit={handleSubmit}
        />
      </Modal>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="ប្រភេទ"
          description="គ្រប់គ្រងប្រភេទផលិតផលរបស់អ្នក។"
        />
      </div>

      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="hidden md:flex flex-wrap items-center gap-4">
            <FilterBar
              filters={categoryFilters}
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
              placeholder="ស្វែងរកប្រភេទ..."
              className="w-full max-w-sm"
            />

            <Button
              variant="primary"
              onClick={() => openAddModal()}
              className="shrink-0 whitespace-nowrap h-[42px] px-5"
            >
              <Plus size={16} className="mr-2" />
              <span className="hidden md:inline">បន្ថែមប្រភេទ</span>
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
                filters={categoryFilters}
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