import React from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { useUsers } from '../hooks/useUsers'
import UserForm from '../components/UserForm'
import DataTable from '../../../common/DataTable'
import SearchBar from '../../../common/SearchBar'
import Button from '../../../common/Button'
import Modal from '../../../common/Modal'
import PageHeader from '../../../common/PageHeader'
import FilterBar from '../../../common/FilterBar'
import DeleteButton from '../../../common/DeleteButton'
import Pagination from '../../../common/Pagination'

const ROLE_COLORS = {
  Admin: 'bg-purple-100 text-purple-700',
  Editor: 'bg-blue-100 text-blue-700',
  Viewer: 'bg-slate-100 text-slate-600',
}

export default function AdminUsers() {
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

  const userFilters = [
    {
      key: 'status',
      options: ['All', 'Active', 'Inactive'],
    },
    {
      key: 'role',
      options: ['All', 'Admin', 'Editor', 'Viewer'],
    },
  ]

  const columns = [
    {
      header: 'Avatar',
      render: (row) =>
        row.image ? (
          <img
            src={row.image}
            alt={row.name}
            className="w-10 h-10 object-cover rounded-full ring-2 ring-slate-100"
          />
        ) : (
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-sm font-semibold">
            {row.name?.charAt(0)}
          </div>
        ),
    },
    {
      header: 'User ID',
      render: (row) => (
        <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
          {row.id}
        </span>
      ),
    },
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'Phone',
      render: (row) => (
        <span className="text-slate-500">{row.phone || '—'}</span>
      ),
    },
    {
      header: 'Role',
      render: (row) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
            ROLE_COLORS[row.role] || 'bg-gray-100 text-gray-600'
          }`}
        >
          {row.role}
        </span>
      ),
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
      header: 'Joined',
      render: (row) => (
        <span className="text-slate-500 text-sm">{row.createAt}</span>
      ),
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleEdit(row)}
            className="text-slate-400 hover:text-blue-600 transition-colors"
            title="Edit User"
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
        title={editingUser ? 'Edit User' : 'Add New User'}
      >
        <UserForm
          initialData={editingUser}
          onSubmit={handleSubmit}
        />
      </Modal>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="User Accounts"
          description="Manage administrator and staff accounts."
        />
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <FilterBar
            filters={userFilters}
            values={filters}
            onChange={handleFilterChange}
          />
          <FilterBar
            filters={[{ key: 'sort', options: ['Newest First', 'Oldest First', 'A → Z', 'Z → A'] }]}
            values={{ sort: sortOrder }}
            onChange={(key, value) => handleSortChange({ target: { value } })}
          />
        </div>

        <div className="flex items-center gap-3">
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search users..."
          />
          <Button
            variant="primary"
            onClick={() => openAddModal()}
            className="shrink-0 whitespace-nowrap"
          >
            <Plus size={16} className="mr-2" />
            Add User
          </Button>
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