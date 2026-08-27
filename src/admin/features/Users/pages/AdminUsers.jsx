import React, { useState } from 'react'
import { Plus, Edit, Trash2, SlidersHorizontal } from 'lucide-react'
import { useUsers } from '../hooks/useUsers'
import UserForm from '../components/UserForm'
import DataTable from '../../../components/common/DataTable'
import SearchBar from '../../../components/common/SearchBar'
import Button from '../../../components/common/Button'
import Modal from '../../../components/common/Modal'
import PageHeader from '../../../components/common/PageHeader'
import FilterBar from '../../../components/common/FilterBar'
import DeleteButton from '../../../components/common/DeleteButton'
import Pagination from '../../../components/common/Pagination'

const ROLE_COLORS = {
  Admin: 'bg-purple-100 text-purple-700',
  User: 'bg-blue-100 text-blue-700',
}

export default function AdminUsers() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const {
    search,
    filters,
    sortOrder,
    currentPage,
    isModalOpen,
    editingUser,
    paginatedUsers,
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
  } = useUsers()

  const roleFilters = [
    {
      key: 'role',
      options: [
        { label: 'ទាំងអស់', value: '' },
        { label: 'អ្នកគ្រប់គ្រង', value: 'Admin' },
        { label: 'អ្នកប្រើប្រាស់', value: 'User' },
      ],
    },
  ]
  const userFilters = [
    ...roleFilters,
  ]


  const columns = [
    {
      header: 'រូបតំណាង',
      render: (row) => (
        <div className=" h-10 w-10 min-w-[2.5rem] bg-blue-100 border border-blue-200 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">
          {row.name?.charAt(0)?.toUpperCase()}
        </div>
      ),
    },
    {
      header: 'លេខសម្គាល់',
      render: (row) => (
        <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
          {row.id}
        </span>
      ),
    },
    {
      header: 'ឈ្មោះ',
      accessor: 'name',
    },
    {
      header: 'អ៊ីមែល',
      render: (row) => (
        <span className="text-slate-500">{row.email || '—'}</span>
      ),
    },
    {
      header: 'តួនាទី',
      render: (row) => {
        const roleKhmer = row.role === 'Admin' ? 'អ្នកគ្រប់គ្រង' : row.role === 'User' ? 'អ្នកប្រើប្រាស់' : row.role;
        return (
        <span
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${ROLE_COLORS[row.role] || 'bg-gray-100 text-gray-600'
            }`}
        >
          {roleKhmer}
        </span>
        )
      },
    },
    {
      header: 'ថ្ងៃចូលរួម',
      render: (row) => (
        <span className="text-slate-500 text-sm">
          {row.createdAt
            ? new Date(row.createdAt).toLocaleString("km-KH", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "—"}
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
            title="កែប្រែអ្នកប្រើប្រាស់"
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
        title={editingUser ? 'កែប្រែអ្នកប្រើប្រាស់' : 'បន្ថែមអ្នកប្រើប្រាស់ថ្មី'}
      >
        <UserForm
          initialData={editingUser}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      </Modal>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="គណនីអ្នកប្រើប្រាស់"
          description="គ្រប់គ្រងគណនីអ្នកគ្រប់គ្រង និងបុគ្គលិក។"
        />
      </div>

      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="hidden md:flex flex-wrap items-center gap-4">
            <FilterBar
              filters={userFilters}
              values={filters}
              onChange={handleFilterChange}
            />
            <FilterBar
              filters={[{ key: 'sort', options: ['ថ្មីបំផុតមុន', 'ចាស់បំផុតមុន', 'A → Z', 'Z → A'] }]}
              values={{ sort: sortOrder }}
              onChange={(key, value) => handleSortChange({ target: { value } })}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <SearchBar
              value={search}
              onChange={handleSearchChange}
              placeholder="ស្វែងរកអ្នកប្រើប្រាស់..."
              className="w-full max-w-sm"
            />
            <Button
              variant="primary"
              onClick={() => openAddModal()}
              className="shrink-0 whitespace-nowrap h-[42px] px-5"
            >
              <Plus size={16} className="mr-2" />
              <span className="hidden md:inline">បន្ថែមអ្នកប្រើប្រាស់</span>
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
                filters={roleFilters}
                values={filters}
                onChange={handleFilterChange}
              />
              <FilterBar
                filters={[{ key: 'sort', options: ['ថ្មីបំផុតមុន', 'ចាស់បំផុតមុន', 'A → Z', 'Z → A'] }]}
                values={{ sort: sortOrder }}
                onChange={(key, value) => handleSortChange({ target: { value } })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
        <DataTable columns={columns} data={paginatedUsers} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}