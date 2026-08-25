import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Save, ImagePlus, X } from 'lucide-react'
import { useCategoryContext } from '../../../../context/CategoryContext'

export default function ProductsForm({ onSubmit, initialData }) {
  const { categories } = useCategoryContext()
  const [discountPercentage, setDiscountPercentage] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    stock: '',
    oldPrice: '',
    discount: '',
    price: '',
    description: '',
    images: [],
    existingImages: [],
  })

  const fileInputRef = useRef(null)
  const isEditing = !!initialData

  useEffect(() => {
    if (initialData) {
      let existingImages = []

      if (Array.isArray(initialData.images) && initialData.images.length > 0) {
        existingImages = initialData.images
      } else if (initialData.image) {
        existingImages = [initialData.image]
      }

      setFormData({
        name: initialData.name || '',
        sku: initialData.sku || '',
        category: initialData.category || '',
        stock: initialData.stock || 0,
        oldPrice: initialData.oldPrice || '',
        discount: initialData.discount || '',
        price: initialData.price || '',
        description: initialData.description || '',
        images: [],
        existingImages,
      })
    } else {
      setFormData({
        name: '',
        sku: '',
        category: '',
        stock: '',
        oldPrice: '',
        discount: '',
        price: '',
        description: '',
        images: [],
        existingImages: [],
      })
      setDiscountPercentage(0)
    }
  }, [initialData])

  useEffect(() => {
    const oldPrice = Number(formData.oldPrice)
    const discount = Number(formData.discount)

    if (oldPrice > 0 && discount > 0) {
      setDiscountPercentage(
        Math.min(Math.round((discount / oldPrice) * 100), 100)
      )
    } else {
      setDiscountPercentage(0)
    }
  }, [formData.oldPrice, formData.discount])

  const sellPrice = useMemo(() => {
    if (formData.oldPrice === '') return ''

    const oldPrice = Number(formData.oldPrice)
    const discount = Number(formData.discount) || 0

    if (oldPrice <= 0) return 0

    return Math.max(0, oldPrice - discount)
  }, [formData.oldPrice, formData.discount])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageAdd = (e) => {
    const incoming = Array.from(e.target.files)

    setFormData((prev) => {
      const existingKeys = new Set(
        prev.images.map((file) => file.name + file.size)
      )

      const newFiles = incoming.filter(
        (file) => !existingKeys.has(file.name + file.size)
      )

      return {
        ...prev,
        images: [...prev.images, ...newFiles],
      }
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeNewImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const removeExistingImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== index),
    }))
  }

  const totalImageCount =
    formData.existingImages.length + formData.images.length

  const handleSubmit = (e) => {
    e.preventDefault()

    const keptExisting = Array.isArray(formData.existingImages)
      ? formData.existingImages
      : []

    const newImageUrls = Array.isArray(formData.images)
      ? formData.images.map((file) => URL.createObjectURL(file))
      : []

    const allImages = [...keptExisting, ...newImageUrls]

    onSubmit({
      ...formData,
      price: sellPrice === '' ? '' : sellPrice,
      oldPrice: formData.oldPrice === '' ? 0 : Number(formData.oldPrice),
      discount: formData.discount === '' ? 0 : Number(formData.discount),
      stock: formData.stock === '' ? 0 : Number(formData.stock),
      images: allImages,
      image: allImages[0] ?? (initialData ? initialData.image : ''),
    })
  }

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
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required={!isEditing}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          >
            <option value="">ជ្រើសរើសប្រភេទ</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ស្តុក
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
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
            តម្លៃចាស់ ($)
          </label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
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
              (បញ្ចុះ {discountPercentage}%)
            </span>
          </div>
          <input
            type="number"
            name="discount"
            value={formData.discount}
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
            value={sellPrice}
            readOnly
            placeholder="0.00"
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
            {formData.existingImages.map((url, index) => (
              <div
                key={`existing-${index}`}
                className="relative"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <img
                    src={url}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition-colors z-10"
                  title="Remove image"
                >
                  <X size={11} strokeWidth={3} />
                </button>

                {index === 0 && (
                  <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-blue-500 text-white px-1 rounded">
                    គោល
                  </span>
                )}
              </div>
            ))}

            {formData.images.map((file, index) => (
              <div
                key={`new-${index}`}
                className="relative"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden border border-blue-200 shadow-sm">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition-colors z-10"
                  title="Remove image"
                >
                  <X size={11} strokeWidth={3} />
                </button>

                {formData.existingImages.length === 0 &&
                  index === 0 && (
                    <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-blue-500 text-white px-1 rounded">
                      គោល
                    </span>
                  )}

                <span className="absolute bottom-1 right-1 text-[9px] bg-green-500 text-white px-1 rounded">
                  ថ្មី
                </span>
              </div>
            ))}
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
              គាំទ្រ JPG, PNG, WEBP
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