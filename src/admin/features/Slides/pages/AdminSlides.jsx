import React, { useState } from 'react'
import { Plus, Edit, Trash2, SlidersHorizontal } from 'lucide-react'
import { useSlides } from '../hooks/useSlides'
import SlideForm from '../components/SlideForm'
import PageHeader from '../../../components/common/PageHeader'
import FilterBar from '../../../components/common/FilterBar'
import SearchBar from '../../../components/common/SearchBar'
import DataTable from '../../../components/common/DataTable'
import Button from '../../../components/common/Button'
import Modal from '../../../components/common/Modal'
import DeleteButton from '../../../components/common/DeleteButton'
import Pagination from '../../../components/common/Pagination'

export default function AdminSlides() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const {
    search,
    filters,
    sortOrder,
    currentPage,
    isModalOpen,
    editingSlide,
    paginatedSlides,
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
  } = useSlides()

  const columns = [
    {
      header: 'រូបភាព',
      render: (row) =>
        row.image ? (
          <img
            src={row.image}
            alt={row.title}
            className=" h-16 w-16 min-w-[4rem] object-cover rounded"
          />
        ) : (
          <div className=" h-16 w-16 min-w-[4rem] bg-gray-100 rounded-lg flex items-center justify-center text-[10px] md:text-xs text-gray-400">
            គ្មានរូបភាព
          </div>
        ),
    },
    { header: 'ស្លាក', render: (row) => <span className="inline-block whitespace-nowrap font-bold bg-slate-100 text-black/70 py-1 px-2 rounded border-2 border-slate-400">{row.tag}</span> },
    { header: 'ចំណងជើង', accessor: 'title' },
    { header: 'ការពិពណ៌នា', accessor: 'description' },
    { header: 'បញ្ចុះតម្លៃ', render: (row) => (
      <span className="inline-block whitespace-nowrap font-bold bg-pink-600 text-white py-1 px-2 rounded border-2 border-slate-400">
        {row.discount || 'N/A'}
      </span>
    ) },
    { header: 'អត្ថបទប៊ូតុង', accessor: 'ctaText' },
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
            title="កែប្រែស្លាយ"
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
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingSlide ? 'កែប្រែស្លាយ' : 'បន្ថែមស្លាយថ្មី'}
      >
        <SlideForm initialData={editingSlide} onSubmit={handleSubmit} />
      </Modal>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="បដាស្លាយ"
          description="គ្រប់គ្រងស្លាយ និងក្រាហ្វិកផ្សព្វផ្សាយ។"
        />
      </div>

      {/* Toolbar */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="hidden md:flex flex-wrap items-center gap-4">
            <FilterBar
              filters={[
                { key: 'status', options: ['ទាំងអស់', 'Active', 'Inactive'] },
              ]}
              values={filters}
              onChange={handleFilterChange}
            />
            <FilterBar
              filters={[{ key: 'sort', options: ['ថ្មីបំផុតមុន', 'A → Z', 'Z → A'] }]}
              values={sortOrder}
              onChange={(key, value) => {
                handleSortChange({ target: { value } })
              }}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <SearchBar
              type="text"
              placeholder="ស្វែងរកស្លាយ..."
              value={search}
              onChange={handleSearchChange}
              className="w-full max-w-sm"
            />
            <Button
              variant="primary"
              onClick={openAddModal}
              className="shrink-0 whitespace-nowrap h-[42px] px-5"
            >
              <Plus size={16} className="mr-2" />
              <span className="hidden md:inline">បន្ថែមស្លាយ</span>
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
                filters={[
                  { key: 'status', options: ['ទាំងអស់', 'Active', 'Inactive'] },
                ]}
                values={filters}
                onChange={handleFilterChange}
              />
              <FilterBar
                filters={[{ key: 'sort', options: ['ថ្មីបំផុតមុន', 'A → Z', 'Z → A'] }]}
                values={sortOrder}
                onChange={(key, value) => {
                  handleSortChange({ target: { value } })
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
        <DataTable columns={columns} data={paginatedSlides} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}