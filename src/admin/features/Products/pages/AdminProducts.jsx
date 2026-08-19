import React, { useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import DataTable from '../../../common/DataTable'
import SearchBar from '../../../common/SearchBar'
import Button from '../../../common/Button'
import Modal from '../../../common/Modal'
import PageHeader from '../../../common/PageHeader'
import FilterBar from '../../../common/FilterBar'
import ProductsForm from '../components/ProductForm'
import DeleteButton from '../../../common/DeleteButton'

export default function AdminProducts() {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const [filters, setFilters] = useState({
    category: '',
    status: '',
  })

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      sku: 'SKU-00001',
      category: 'Cosmetic',
      price: 79.99,
      discount: 0,
      salePrice: 79.99,
      description: 'High-quality wireless headphones with noise cancellation.',
      stock: 15,
      image: 'https://i.pinimg.com/736x/0f/cc/03/0fcc03cfdb519e20f69e9699e2f8cdd0.jpg',
    },
    {
      id: 2,
      name: 'Smart Watch Series 5',
      sku: 'SKU-00002',
      category: 'Skincare',
      price: 199.99,
      discount: 0,
      description: 'Stay connected and track your fitness with this smart watch.',
      salePrice: 199.99,
      stock: 8,
      image: 'https://i.pinimg.com/736x/0f/cc/03/0fcc03cfdb519e20f69e9699e2f8cdd0.jpg',
    },
  ])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const productFilters = [
    {
      key: 'category',
      options: ['All', 'Cosmetic', 'Skincare', 'Body Care', 'Hair Care'],
    },
    {
      key: 'status',
      options: ['All', 'In Stock', 'Low Stock', 'Out of Stock'],
    },
  ]

  const handleSubmitProduct = (data) => {
    const formattedData = {
      name: data.name,
      sku: data.sku,
      category: data.category,
      price: Number(data.price) || 0,
      discount: Number(data.discount) || 0,
      salePrice: Number(data.salePrice) || 0,
      stock: Number(data.stock) || 0,
      description: data.description || '', // <-- Add this line
      image: data.images?.[0]
        ? URL.createObjectURL(data.images[0])
        : (editingProduct ? editingProduct.image : ''),
    }

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...formattedData } : p))
      )
    } else {
      setProducts((prev) => [...prev, { id: Date.now(), ...formattedData }])
    }

    closeModal()
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
      setProducts((prev) => prev.filter((product) => product.id !== id))
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const getStockStatus = (stock) => {
    if (stock === 0) return 'Out of Stock'
    if (stock <= 10) return 'Low Stock'
    return 'In Stock'
  }

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
      render: (row) => `$${Number(row.discount).toFixed(2)}`,
    },
    {
      header: 'Price',
      render: (row) => `$${Number(row.price).toFixed(2)}`,
    },
    {
      header: 'Stock',
      accessor: 'stock',
    },
    {
      header: 'Status',
      render: (row) => getStockStatus(row.stock),
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
            className="text-slate-400 hover:text-red-600 transition-colors">
            <Trash2 size={18} />
          </DeleteButton>
        </div>
      ),
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchCategory =
      filters.category === '' ||
      filters.category === 'All' ||
      product.category === filters.category

    const matchStatus =
      filters.status === '' ||
      filters.status === 'All' ||
      getStockStatus(product.stock) === filters.status

    return matchSearch && matchCategory && matchStatus
  })

  return (
    <div className="space-y-6">
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingProduct ? "Edit Product" : "Add New Product"}
      >
        <ProductsForm
          initialData={editingProduct} 
          onSubmit={handleSubmitProduct}
        />
      </Modal>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Products"
          description="Manage your product catalog, pricing, and stock inventory."
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <FilterBar
          filters={productFilters}
          values={filters}
          onChange={handleFilterChange}
        />

        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />
        <Button
          variant="primary"
          onClick={() => {
            setEditingProduct(null)
            setIsModalOpen(true)
          }}
        >
          <Plus size={16} className="mr-2" />
          Add Product
        </Button>
      </div>

      <DataTable columns={columns} data={filteredProducts} />
    </div>
  )
}