import React, { useState } from 'react'
import { Plus, Edit, Trash2, ArrowUpAZ, ArrowDownAZ } from 'lucide-react'
import DataTable from '../../../common/DataTable'
import SearchBar from '../../../common/SearchBar'
import Button from '../../../common/Button'
import Modal from '../../../common/Modal'
import PageHeader from '../../../common/PageHeader'
import FilterBar from '../../../common/FilterBar'
import ProductsForm from '../components/ProductForm'
import DeleteButton from '../../../common/DeleteButton'
import Pagination from '../../../common/Pagination'

const ITEMS_PER_PAGE = 5

export default function AdminProducts() {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState('newest')

  const [filters, setFilters] = useState({
    category: '',
    status: '',
  })

const [products, setProducts] = useState([
  {
    id: 1,
    name: 'Wireless Headphones',
    sku: 'SKU-00001',
    category: 'Electronics',
    price: 79.99,
    discount: 10,
    salePrice: 71.99,
    description: 'High-quality wireless headphones with noise cancellation.',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    sku: 'SKU-00002',
    category: 'Electronics',
    price: 199.99,
    discount: 5,
    salePrice: 189.99,
    description: 'Stay connected and track your fitness with this smart watch.',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
  },
  {
    id: 3,
    name: 'Vitamin C Serum',
    sku: 'SKU-00003',
    category: 'Skincare',
    price: 24.99,
    discount: 15,
    salePrice: 21.24,
    description: 'Brightening vitamin C serum for healthy glowing skin.',
    stock: 32,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800',
  },
  {
    id: 4,
    name: 'Matte Lipstick',
    sku: 'SKU-00004',
    category: 'Makeup',
    price: 14.99,
    discount: 10,
    salePrice: 13.49,
    description: 'Long-lasting matte lipstick with a smooth finish.',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800',
  },
  {
    id: 5,
    name: 'Facial Cleanser',
    sku: 'SKU-00005',
    category: 'Skincare',
    price: 18.99,
    discount: 0,
    salePrice: 18.99,
    description: 'Gentle facial cleanser suitable for daily use.',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800',
  },
  {
    id: 6,
    name: 'Moisturizing Cream',
    sku: 'SKU-00006',
    category: 'Skincare',
    price: 29.99,
    discount: 20,
    salePrice: 23.99,
    description: 'Deep moisturizing cream for soft and hydrated skin.',
    stock: 18,
    image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800',
  },
  {
    id: 7,
    name: 'Foundation Pro',
    sku: 'SKU-00007',
    category: 'Makeup',
    price: 34.99,
    discount: 10,
    salePrice: 31.49,
    description: 'Lightweight foundation with natural full-day coverage.',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800',
  },
  {
    id: 8,
    name: 'Eyeshadow Palette',
    sku: 'SKU-00008',
    category: 'Makeup',
    price: 39.99,
    discount: 15,
    salePrice: 33.99,
    description: 'Professional eyeshadow palette with multiple colors.',
    stock: 12,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800',
  },
  {
    id: 9,
    name: 'Perfume Classic',
    sku: 'SKU-00009',
    category: 'Perfume',
    price: 59.99,
    discount: 5,
    salePrice: 56.99,
    description: 'Elegant fragrance with a fresh and long-lasting scent.',
    stock: 10,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
  },
  {
    id: 10,
    name: 'Rose Perfume',
    sku: 'SKU-00010',
    category: 'Perfume',
    price: 69.99,
    discount: 10,
    salePrice: 62.99,
    description: 'Beautiful rose fragrance designed for everyday elegance.',
    stock: 14,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800',
  },
  {
    id: 11,
    name: 'Hair Shampoo',
    sku: 'SKU-00011',
    category: 'Haircare',
    price: 16.99,
    discount: 0,
    salePrice: 16.99,
    description: 'Nourishing shampoo for clean and healthy hair.',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800',
  },
  {
    id: 12,
    name: 'Hair Conditioner',
    sku: 'SKU-00012',
    category: 'Haircare',
    price: 17.99,
    discount: 10,
    salePrice: 16.19,
    description: 'Smooth and moisturizing conditioner for dry hair.',
    stock: 35,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8e8c5e1e7?w=800',
  },
  {
    id: 13,
    name: 'Hair Styling Gel',
    sku: 'SKU-00013',
    category: 'Haircare',
    price: 12.99,
    discount: 5,
    salePrice: 12.34,
    description: 'Strong-hold styling gel for different hairstyles.',
    stock: 28,
    image: 'https://images.unsplash.com/photo-1626015365107-2f6d5f5e5f6b?w=800',
  },
  {
    id: 14,
    name: 'Body Lotion',
    sku: 'SKU-00014',
    category: 'Bodycare',
    price: 21.99,
    discount: 15,
    salePrice: 18.69,
    description: 'Hydrating body lotion with a soft refreshing fragrance.',
    stock: 22,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800',
  },
  {
    id: 15,
    name: 'Body Wash',
    sku: 'SKU-00015',
    category: 'Bodycare',
    price: 15.99,
    discount: 0,
    salePrice: 15.99,
    description: 'Refreshing body wash for clean and smooth skin.',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=800',
  },
  {
    id: 16,
    name: 'Sunscreen SPF 50',
    sku: 'SKU-00016',
    category: 'Skincare',
    price: 27.99,
    discount: 20,
    salePrice: 22.39,
    description: 'High-protection sunscreen with SPF 50 for daily use.',
    stock: 27,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800',
  },
  {
    id: 17,
    name: 'Face Toner',
    sku: 'SKU-00017',
    category: 'Skincare',
    price: 19.99,
    discount: 10,
    salePrice: 17.99,
    description: 'Refreshing toner that helps balance and hydrate skin.',
    stock: 19,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800',
  },
  {
    id: 18,
    name: 'Makeup Brush Set',
    sku: 'SKU-00018',
    category: 'Makeup',
    price: 32.99,
    discount: 15,
    salePrice: 28.04,
    description: 'Complete professional makeup brush set for daily use.',
    stock: 16,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
  },
  {
    id: 19,
    name: 'Blush Powder',
    sku: 'SKU-00019',
    category: 'Makeup',
    price: 22.99,
    discount: 5,
    salePrice: 21.84,
    description: 'Soft powder blush that gives your cheeks a natural glow.',
    stock: 24,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
  },
  {
    id: 20,
    name: 'Lip Gloss',
    sku: 'SKU-00020',
    category: 'Makeup',
    price: 11.99,
    discount: 10,
    salePrice: 10.79,
    description: 'Glossy lip color with a smooth and comfortable texture.',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800',
  },
  {
    id: 21,
    name: 'Luxury Perfume',
    sku: 'SKU-00021',
    category: 'Perfume',
    price: 89.99,
    discount: 20,
    salePrice: 71.99,
    description: 'Premium luxury perfume with an elegant long-lasting aroma.',
    stock: 7,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800',
  },
  {
    id: 22,
    name: 'Men Sport Perfume',
    sku: 'SKU-00022',
    category: 'Perfume',
    price: 49.99,
    discount: 10,
    salePrice: 44.99,
    description: 'Fresh sporty fragrance designed for active lifestyles.',
    stock: 13,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800',
  },
  {
    id: 23,
    name: 'Anti-Dandruff Shampoo',
    sku: 'SKU-00023',
    category: 'Haircare',
    price: 19.99,
    discount: 15,
    salePrice: 16.99,
    description: 'Anti-dandruff shampoo that keeps your scalp fresh and clean.',
    stock: 21,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800',
  },
  {
    id: 24,
    name: 'Hair Repair Mask',
    sku: 'SKU-00024',
    category: 'Haircare',
    price: 26.99,
    discount: 10,
    salePrice: 24.29,
    description: 'Deep repair hair mask for damaged and dry hair.',
    stock: 17,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800',
  },
  {
    id: 25,
    name: 'Body Scrub',
    sku: 'SKU-00025',
    category: 'Bodycare',
    price: 23.99,
    discount: 5,
    salePrice: 22.79,
    description: 'Gentle exfoliating body scrub for smooth and soft skin.',
    stock: 26,
    image: 'https://images.unsplash.com/photo-1600428877878-1a0c9f6f7a75?w=800',
  },
  {
    id: 26,
    name: 'Hand Cream',
    sku: 'SKU-00026',
    category: 'Bodycare',
    price: 9.99,
    discount: 0,
    salePrice: 9.99,
    description: 'Fast-absorbing hand cream for dry and rough hands.',
    stock: 55,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
  },
  {
    id: 27,
    name: 'Wireless Earbuds',
    sku: 'SKU-00027',
    category: 'Electronics',
    price: 59.99,
    discount: 15,
    salePrice: 50.99,
    description: 'Compact wireless earbuds with clear sound and long battery life.',
    stock: 18,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
  },
  {
    id: 28,
    name: 'Portable Speaker',
    sku: 'SKU-00028',
    category: 'Electronics',
    price: 44.99,
    discount: 10,
    salePrice: 40.49,
    description: 'Portable Bluetooth speaker with powerful stereo sound.',
    stock: 11,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
  },
  {
    id: 29,
    name: 'Smartphone Stand',
    sku: 'SKU-00029',
    category: 'Accessories',
    price: 13.99,
    discount: 5,
    salePrice: 13.29,
    description: 'Adjustable smartphone stand suitable for home and office.',
    stock: 38,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800',
  },
  {
    id: 30,
    name: 'USB-C Fast Charger',
    sku: 'SKU-00030',
    category: 'Accessories',
    price: 29.99,
    discount: 20,
    salePrice: 23.99,
    description: 'Fast USB-C charger compatible with modern smartphones and tablets.',
    stock: 33,
    image: 'https://images.unsplash.com/photo-1609592424720-2d7c5c0a4b9b?w=800',
  },
])
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
    setCurrentPage(1)
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
      setProducts((prev) => [{ id: Date.now(), ...formattedData }, ...prev])
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

  const filteredProducts = products
    .filter((product) => {
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
    .sort((a, b) => {
        if (sortOrder === 'newest') return b.id - a.id 
        if (sortOrder === 'asc') return a.name.localeCompare(b.name)
        return b.name.localeCompare(a.name)
    })

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

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
        <div className="flex items-center gap-4">
          <FilterBar
            filters={productFilters}
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
            placeholder="Search products..."
          />
          <Button
            variant="primary"
            onClick={() => {
              setEditingProduct(null)
              setIsModalOpen(true)
            }}
            className="shrink-0 whitespace-nowrap"
          >
            <Plus size={16} className="mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={paginatedProducts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}