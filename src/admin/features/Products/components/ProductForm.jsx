import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Save, ImagePlus, X, ChevronDown, Search } from 'lucide-react'
import { useCategoryContext } from '../../../../context/CategoryContext'

export default function ProductsForm({ onSubmit, initialData }) {
  const { categories } = useCategoryContext()
  const [discountPercentage, setDiscountPercentage] = useState(0)

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    categoryId: '',
    stockQuantity: '',
    price: '',
    discountPrice: '',
    salePrice: '',
    description: '',
    imageSlots: [],
  })

  const fileInputRef = useRef(null)
  const isEditing = !!initialData

  useEffect(() => {
    if (!initialData) {
      setFormData({
        name: '',
        sku: '',
        categoryId: '',
        stockQuantity: '',
        price: '',
        discountPrice: '',
        salePrice: '',
        description: '',
        imageSlots: [],
      })
      setDiscountPercentage(0)
      return
    }

    const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || ''
    let imageSlots = []

    if (Array.isArray(initialData.rawImages) && initialData.rawImages.length > 0) {
      imageSlots = initialData.rawImages.map((img, index) => {
        const imagePath = typeof img === 'string' ? img : (img.image || '')
        const imgId = typeof img === 'object' && img.id ? img.id : index + 1
        const url = imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`

        return {
          id: imgId,
          url,
          file: null,
          isNew: false,
        }
      })
    } else if (Array.isArray(initialData.images) && initialData.images.length > 0) {
      imageSlots = initialData.images.map((url, index) => ({
        id: index + 1,
        url,
        file: null,
        isNew: false,
      }))
    } else if (initialData.image) {
      imageSlots = [
        {
          id: 1,
          url: initialData.image,
          file: null,
          isNew: false,
        },
      ]
    }

    setFormData({
      name: initialData.name || '',
      sku: initialData.sku || '',
      categoryId: initialData.categoryId ?? initialData.category_id ?? '',
      stockQuantity: initialData.stockQuantity ?? initialData.stock_quantity ?? 0,
      price: initialData.price ?? '',
      discountPrice: initialData.discountPrice ?? initialData.discount_price ?? 0,
      salePrice: initialData.salePrice ?? initialData.sale_price ?? '',
      description: initialData.description || '',
      imageSlots,
    })
  }, [initialData])

  useEffect(() => {
    const price = Number(formData.price)
    const discountPrice = Number(formData.discountPrice)

    if (price > 0 && discountPrice > 0) {
      setDiscountPercentage(
        Math.min(Math.round((discountPrice / price) * 100), 100)
      )
    } else {
      setDiscountPercentage(0)
    }
  }, [formData.price, formData.discountPrice])

  const calculatedSalePrice = useMemo(() => {
    if (formData.price === '') return ''

    const price = Number(formData.price)
    const discountPrice = Number(formData.discountPrice) || 0

    if (price <= 0) return 0
    return Math.max(0, price - discountPrice)
  }, [formData.price, formData.discountPrice])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageAdd = (e) => {
    const incoming = Array.from(e.target.files || [])
    if (!incoming.length) return

    const MAX_FILE_SIZE = 5 * 1024 * 1024

    const validFiles = incoming.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name} is larger than 5MB`)
        return false
      }
      return true
    })

    if (!validFiles.length) return

    setFormData((prev) => {
      const slots = [...prev.imageSlots]

      validFiles.forEach((file) => {
        const emptyIndex = slots.findIndex((slot) => slot === null)

        if (emptyIndex !== -1) {
          slots[emptyIndex] = {
            id: prev.imageSlots[emptyIndex]?.id ?? emptyIndex + 1,
            url: URL.createObjectURL(file),
            file,
            isNew: true,
          }
        } else {
          slots.push({
            id: null,
            url: URL.createObjectURL(file),
            file,
            isNew: true,
          })
        }
      })

      return {
        ...prev,
        imageSlots: slots,
      }
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeImage = (index) => {
    setFormData((prev) => {
      const slots = [...prev.imageSlots]
      slots[index] = null
      return {
        ...prev,
        imageSlots: slots,
      }
    })
  }

  const urlToFile = async (url, filename) => {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to download image: ${url}`)
    }
    const blob = await response.blob()

    return new File([blob], filename, {
      type: blob.type || 'image/jpeg',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const payload = new FormData()

      if (isEditing && initialData?.id) {
        payload.append('id', String(initialData.id))
      }

      payload.append('name', formData.name.trim())
      payload.append('sku', formData.sku.trim())
      payload.append('category_id', String(formData.categoryId || ''))
      payload.append('stock_quantity', String(formData.stockQuantity === '' ? 0 : Number(formData.stockQuantity)))
      payload.append('price', String(formData.price === '' ? 0 : Number(formData.price)))
      payload.append('discount_price', String(formData.discountPrice === '' ? 0 : Number(formData.discountPrice)))
      payload.append('salePrice', String(calculatedSalePrice === '' ? 0 : Number(calculatedSalePrice)))
      payload.append('description', formData.description || '')

      const finalSlots = formData.imageSlots.filter(Boolean)

      for (let index = 0; index < finalSlots.length; index++) {
        const slot = finalSlots[index]
        let file = slot.file

        if (!file && slot.url) {
          file = await urlToFile(slot.url, `product-image-${index + 1}.jpg`)
        }

        if (file) {
          payload.append('images', file, file.name)
        }
      }

      console.log('========== PRODUCT UPDATE ==========')
      for (const [key, value] of payload.entries()) {
        if (value instanceof File) {
          console.log(key, 'FILE:', value.name)
        } else {
          console.log(key, value)
        }
      }
      console.log('=====================================')

      onSubmit(payload)
    } catch (error) {
      console.error('Failed to prepare product images:', error)
      alert('Failed to prepare product images')
    }
  }

  const totalImageCount = formData.imageSlots.filter(Boolean).length

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ឈ្មោះផលិតផល {!isEditing && '*'}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="ឈ្មោះផលិតផល"
            required={!isEditing}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            SKU {!isEditing && '*'}
          </label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="SKU code"
            required={!isEditing}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ប្រភេទ {!isEditing && '*'}
          </label>
          <SearchableCategorySelect
            categories={categories}
            value={formData.categoryId}
            onChange={handleChange}
            isEditing={isEditing}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ស្តុក
          </label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            min="0"
            placeholder="0"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            តម្លៃដើម ($)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="0.00"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <label className="text-xs font-semibold text-gray-600">
              បញ្ចុះតម្លៃ ($)
            </label>
            <span className="text-xs font-normal text-red-600">
              ({discountPercentage}%)
            </span>
          </div>
          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="0.00"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            តម្លៃលក់ ($)
          </label>
          <input
            type="number"
            value={calculatedSalePrice}
            readOnly
            className="w-full px-3 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg outline-none cursor-not-allowed"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          ការពិពណ៌នា
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="ការពិពណ៌នាផលិតផល..."
          className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none resize-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold text-gray-600">
            រូបភាពផលិតផល
            {totalImageCount > 0 && (
              <span className="ml-1 text-blue-500">
                ({totalImageCount})
              </span>
            )}
          </label>

          <input
            ref={fileInputRef}
            id="product-image-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImageAdd}
            className="hidden"
          />

          <label
            htmlFor="product-image-upload"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer transition-colors"
          >
            <ImagePlus size={14} />
            បន្ថែមរូបភាព
          </label>
        </div>

        {totalImageCount > 0 ? (
          <div className="flex flex-wrap gap-3 p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            {formData.imageSlots.map((slot, index) => {
              if (!slot) return null

              return (
                <div
                  key={slot.id ?? `new-${index}`}
                  className="relative"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                    <img
                      src={slot.url}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition-colors z-10"
                  >
                    <X size={11} strokeWidth={3} />
                  </button>

                  {slot.isNew && (
                    <span className="absolute bottom-1 right-1 text-[9px] bg-green-500 text-white px-1 rounded">
                      ថ្មី
                    </span>
                  )}

                  {!slot.isNew && slot.id && (
                    <span className="absolute bottom-1 left-1 text-[9px] bg-black/60 text-white px-1 rounded">
                      ID {slot.id}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <label
            htmlFor="product-image-upload"
            className="flex flex-col items-center justify-center gap-2 w-full h-28 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-gray-400 cursor-pointer hover:border-blue-300 hover:text-blue-400 transition-colors"
          >
            <ImagePlus size={24} />
            <span className="text-xs font-medium">
              ចុចដើម្បីបន្ថែមរូបភាពផលិតផល
            </span>
            <span className="text-[10px]">
              គាំទ្រ JPG, PNG, WEBP — Max 5MB/image
            </span>
          </label>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Save size={16} />
          {isEditing ? 'ធ្វើបច្ចុប្បន្នភាពផលិតផល' : 'រក្សាទុកផលិតផល'}
        </button>
      </div>
    </form>
  )
}

const SearchableCategorySelect = ({
  categories,
  value,
  onChange,
  isEditing,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedCategory = categories.find((c) => String(c.id) === String(value))
  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (categoryId) => {
    onChange({
      target: {
        name: 'categoryId',
        value: categoryId,
      },
    })
    setIsOpen(false)
    setSearch('')
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none flex justify-between items-center cursor-pointer ${
          isOpen ? 'ring-2 ring-gray-200' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedCategory ? 'text-gray-900' : 'text-gray-500'}>
          {selectedCategory ? selectedCategory.name : 'ជ្រើសរើសប្រភេទ'}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="p-2 border-b border-gray-100 relative">
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-50 rounded-md outline-none focus:ring-2 focus:ring-blue-100 transition-shadow"
              placeholder="ស្វែងរកប្រភេទ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>

          <div className="max-h-48 overflow-y-auto py-1">
            <div
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                !value ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
              }`}
              onClick={() => handleSelect('')}
            >
              ជ្រើសរើសប្រភេទ
            </div>

            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                    String(value) === String(category.id)
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700'
                  }`}
                  onClick={() => handleSelect(category.id)}
                >
                  {category.name}
                </div>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-gray-500 text-center">
                គ្មានលទ្ធផលសម្រាប់ "{search}"
              </div>
            )}
          </div>
        </div>
      )}

      <select
        name="categoryId"
        value={value}
        onChange={onChange}
        required={!isEditing}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        tabIndex="-1"
      >
        <option value="">ជ្រើសរើសប្រភេទ</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  )
}