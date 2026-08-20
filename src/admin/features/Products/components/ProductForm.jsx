import React, { useState, useEffect, useRef } from 'react'
import { Save, ImagePlus, X } from 'lucide-react'

export default function ProductsForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    stock: '',
    price: '',
    discount: '',
    salePrice: '',
    description: '',
    images: [],           // new File objects selected by the user
    existingImages: [],   // URL strings already saved on the product (edit mode)
  })

  const fileInputRef = useRef(null)

  // Check if we are editing an existing product
  const isEditing = !!initialData

  useEffect(() => {
    if (initialData) {
      // Support both a single `image` string and an `images` array
      let existing = []
      if (Array.isArray(initialData.images) && initialData.images.length > 0) {
        existing = initialData.images
      } else if (initialData.image) {
        existing = [initialData.image]
      }

      setFormData({
        name: initialData.name || '',
        sku: initialData.sku || '',
        category: initialData.category || '',
        stock: initialData.stock || 0,
        price: initialData.price || '',
        discount: initialData.discount || '',
        salePrice: initialData.salePrice || '',
        description: initialData.description || '',
        images: [],
        existingImages: existing,
      })
    } else {
      setFormData({
        name: '',
        sku: '',
        category: '',
        stock: 0,
        price: '',
        discount: '',
        salePrice: '',
        description: '',
        images: [],
        existingImages: [],
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Append new files; skip duplicates by name+size
  const handleImageAdd = (e) => {
    const incoming = Array.from(e.target.files)
    setFormData((prev) => {
      const existingKeys = new Set(prev.images.map((f) => f.name + f.size))
      const newFiles = incoming.filter((f) => !existingKeys.has(f.name + f.size))
      return { ...prev, images: [...prev.images, ...newFiles] }
    })
    // Reset so the same file can be re-added after removal
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Remove a newly selected File by index
  const removeNewImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  // Remove a saved URL image by index
  const removeExistingImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const totalImageCount = formData.existingImages.length + formData.images.length

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ── Name / SKU ── */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Product Name {!isEditing && '*'}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product name"
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

      {/* ── Category / Stock ── */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Category {!isEditing && '*'}
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required={!isEditing}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          >
            <option value="">Select Category</option>
            <option value="Cosmetic">Cosmetic</option>
            <option value="Skincare">Skincare</option>
            <option value="Body Care">Body Care</option>
            <option value="Hair Care">Hair Care</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Stock
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

      {/* ── Price / Discount / Sale Price ── */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Price ($)
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
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Discount ($)
          </label>
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
            Sale Price ($)
          </label>
          <input
            type="number"
            name="salePrice"
            value={formData.salePrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="0.00"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>

      {/* ── Description ── */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Product description..."
          className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none resize-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

      {/* ── Product Images ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold text-gray-600">
            Product Images{' '}
            {totalImageCount > 0 && (
              <span className="ml-1 text-blue-500">({totalImageCount})</span>
            )}
          </label>

          {/* Hidden file input triggered by the label/button */}
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
            Add Images
          </label>
        </div>

        {/* Image preview grid */}
        {totalImageCount > 0 ? (
          <div className="flex flex-wrap gap-3 p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            {/* Existing saved URL images */}
            {formData.existingImages.map((url, index) => (
              <div key={`existing-${index}`} className="relative">
                <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <img
                    src={url}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Red X remove button */}
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
                    Main
                  </span>
                )}
              </div>
            ))}

            {/* Newly selected File images */}
            {formData.images.map((file, index) => (
              <div key={`new-${index}`} className="relative">
                <div className="w-20 h-20 rounded-lg overflow-hidden border border-blue-200 shadow-sm">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Red X remove button */}
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition-colors z-10"
                  title="Remove image"
                >
                  <X size={11} strokeWidth={3} />
                </button>
                {formData.existingImages.length === 0 && index === 0 && (
                  <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-blue-500 text-white px-1 rounded">
                    Main
                  </span>
                )}
                <span className="absolute bottom-1 right-1 text-[9px] bg-green-500 text-white px-1 rounded">
                  New
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* Empty-state: click to open file picker */
          <label
            htmlFor="product-image-upload"
            className="flex flex-col items-center justify-center gap-2 w-full h-28 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-gray-400 cursor-pointer hover:border-blue-300 hover:text-blue-400 transition-colors"
          >
            <ImagePlus size={24} />
            <span className="text-xs font-medium">Click to add product images</span>
            <span className="text-[10px]">JPG, PNG, WEBP supported</span>
          </label>
        )}
      </div>

      {/* ── Submit ── */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Save size={16} />
          {isEditing ? 'Update Product' : 'Save Product'}
        </button>
      </div>
    </form>
  )
}