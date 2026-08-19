import React, { useState, useEffect } from 'react'
import { Save } from 'lucide-react'

export default function ProductsForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    stock: 0,
    price: '',
    discount: '',
    salePrice: '',
    description: '',
    images: [],
  })

  // Check if we are editing an existing product
  const isEditing = !!initialData

  useEffect(() => {
    if (initialData) {
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
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)

    setFormData((prev) => ({
      ...prev,
      images: files,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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
            required={!isEditing} // Only required when NOT editing
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
            required={!isEditing} // Only required when NOT editing
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Category {!isEditing && '*'}
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required={!isEditing} // Only required when NOT editing
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

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Product Images
        </label>
        <input
          type="file"
          name="images"
          accept="image/jpeg,image/png"
          multiple
          onChange={handleImageChange}
          className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none"
        />

        {formData.images.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.images.map((file, index) => (
              <div
                key={index}
                className="w-14 h-14 rounded-lg overflow-hidden border"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          initialData?.image && (
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="w-14 h-14 rounded-lg overflow-hidden border">
                <img
                  src={initialData.image}
                  alt="Current product"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-gray-400 self-end mb-1">Current image</span>
            </div>
          )
        )}
      </div>

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