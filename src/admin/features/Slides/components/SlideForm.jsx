import React, { useState, useEffect } from 'react'
import { Save } from 'lucide-react'

export default function SlideForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    tag: '',
    title: '',
    description: '',
    discount: '',
    ctaText: '',
    ctaLink: '',
    status: 'Active',
    image: [],
  })

  // Check if we are editing an existing slide
  const isEditing = !!initialData

  useEffect(() => {
    if (initialData) {
      setFormData({
        tag: initialData.tag || '',
        title: initialData.title || '',
        description: initialData.description || '',
        discount: initialData.discount || '',
        ctaText: initialData.ctaText || '',
        ctaLink: initialData.ctaLink || '',
        status: initialData.status || 'Active',
        image: [],
      })
    } else {
      setFormData({
        tag: '',
        title: '',
        description: '',
        discount: '',
        ctaText: '',
        ctaLink: '',
        status: 'Active',
        image: [],
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData((prev) => ({ ...prev, image: files }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Tag & Title */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Tag
          </label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            placeholder="e.g. New Arrival"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Title {!isEditing && '*'}
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Summer Collection"
            required={!isEditing}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>

      {/* Discount & Status */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Discount Label
          </label>
          <input
            type="text"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="e.g. 20% Off"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* CTA Text & CTA Link */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            CTA Button Text
          </label>
          <input
            type="text"
            name="ctaText"
            value={formData.ctaText}
            onChange={handleChange}
            placeholder="e.g. Shop Now"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            CTA Link URL
          </label>
          <input
            type="text"
            name="ctaLink"
            value={formData.ctaLink}
            onChange={handleChange}
            placeholder="e.g. /shop/summer"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Slide description..."
          className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none resize-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

      {/* Slide Image */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Slide Image
        </label>
        <input
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none"
        />

        {formData.image.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.image.map((file, index) => (
              <div
                key={index}
                className="w-24 h-14 rounded-lg overflow-hidden border"
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
              <div className="w-24 h-14 rounded-lg overflow-hidden border">
                <img
                  src={initialData.image}
                  alt="Current slide"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-gray-400 self-end mb-1">
                Current image
              </span>
            </div>
          )
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Save size={16} />
          {isEditing ? 'Update Slide' : 'Save Slide'}
        </button>
      </div>
    </form>
  )
}