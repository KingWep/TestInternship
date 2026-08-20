import { useState } from 'react'

const ITEMS_PER_PAGE = 5

const initialUsers = [
  {
    id: 'USR-001',
    name: 'សុខ សាន្ត',
    phone: '+855 12 345 678',
    role: 'Admin',
    status: 'Active',
    image: 'https://i.pinimg.com/1200x/76/08/bf/7608bfe61d770600b0dda782e14f2393.jpg',
    createAt: '2024-01-15',
  },
  {
    id: 'USR-002',
    name: 'ចាន់ តារា',
    phone: '+855 16 234 567',
    role: 'Editor',
    status: 'Active',
    image: 'https://i.pravatar.cc/150?img=2',
    createAt: '2024-02-20',
  },
  {
    id: 'USR-003',
    name: 'ពេជ្រ សុវណ្ណ',
    phone: '+855 93 456 789',
    role: 'Viewer',
    status: 'Inactive',
    image: 'https://i.pinimg.com/736x/15/69/98/1569986d34a96e52a2e69d17f6980b76.jpg',
    createAt: '2024-03-10',
  },
  {
    id: 'USR-004',
    name: 'ម៉ៅ សុខា',
    phone: '+855 98 123 456',
    role: 'Editor',
    status: 'Active',
    image: 'https://i.pinimg.com/736x/ed/b3/d6/edb3d6f937a4481be64b08d7b001baff.jpg',
    createAt: '2024-04-05',
  },
  {
    id: 'USR-005',
    name: 'រស់ សេរី',
    phone: '+855 11 222 333',
    role: 'Admin',
    status: 'Active',
    image: 'https://i.pinimg.com/736x/a7/81/fa/a781fa3022b40053b714509fbf3867d2.jpg',
    createAt: '2024-05-18',
  },
  {
    id: 'USR-006',
    name: 'កែវ ចរិយា',
    phone: '+855 81 999 888',
    role: 'Viewer',
    status: 'Inactive',
    image: 'https://i.pinimg.com/736x/a7/81/fa/a781fa3022b40053b714509fbf3867d2.jpg',
    createAt: '2024-06-22',
  },
  {
    id: 'USR-007',
    name: 'លឹម ពិសិដ្ឋ',
    phone: '+855 10 777 666',
    role: 'Editor',
    status: 'Active',
    image: 'https://i.pinimg.com/736x/a7/81/fa/a781fa3022b40053b714509fbf3867d2.jpg',
    createAt: '2024-07-30',
  },
];

export function useUsers() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ status: '', role: '' })
  const [sortOrder, setSortOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  // ── Filter & Sort ──────────────────────────────────────────────────────────
  const filteredUsers = users
    .filter((user) => {
      const matchSearch = user.name
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchStatus =
        filters.status === '' ||
        filters.status === 'All' ||
        user.status === filters.status

      const matchRole =
        filters.role === '' ||
        filters.role === 'All' ||
        user.role === filters.role

      return matchSearch && matchStatus && matchRole
    })
    .sort((a, b) => {
      if (sortOrder === 'Newest First' || sortOrder === '') return b.createAt.localeCompare(a.createAt)
      if (sortOrder === 'Oldest First') return a.createAt.localeCompare(b.createAt)
      if (sortOrder === 'A → Z') return a.name.localeCompare(b.name)
      return b.name.localeCompare(a.name) // 'Z → A'
    })

  // ── Pagination ─────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // ── Handlers ───────────────────────────────────────────────────────────────
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

  const handleSubmit = (data) => {
    const formattedData = {
      name: data.name,
      phone: data.phone || '',
      role: data.role || 'Viewer',
      status: data.status || 'Active',
      image: data.image
        ? URL.createObjectURL(data.image)
        : editingUser
        ? editingUser.image
        : '',
      createAt: editingUser
        ? editingUser.createAt
        : new Date().toISOString().split('T')[0],
    }

    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id ? { ...u, ...formattedData } : u
        )
      )
    } else {
      const newId = `USR-${String(Date.now()).slice(-3)}`
      setUsers((prev) => [...prev, { id: data.id || newId, ...formattedData }])
    }

    closeModal()
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  const openAddModal = () => {
    setEditingUser(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingUser(null)
  }

  return {
    // state
    users,
    search,
    filters,
    sortOrder,
    currentPage,
    isModalOpen,
    editingUser,
    // computed
    filteredUsers,
    paginatedUsers,
    totalPages,
    // raw setters
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
