import React, { useState, useEffect } from 'react'
import { Save } from 'lucide-react'

export default function SlideForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    tag: '',
    title: '',
    description: '',
    discountPercentage: '',
    ctaText: '',
    backgroundColor: '#FF5733',
    status: 'Active',
  })



  // Check if we are editing an existing slide
  const isEditing = !!initialData

  useEffect(() => {
    if (initialData) {
      setFormData({
        tag: initialData.tag || '',
        title: initialData.title || '',
        description: initialData.description || '',
        discountPercentage: initialData.discountPercentage || '',
        ctaText: initialData.ctaText || '',
        backgroundColor: initialData.backgroundColor || '#FF5733',
        status: initialData.status || 'Active',
      })
    } else {
      setFormData({
        tag: '',
        title: '',
        description: '',
        discountPercentage: '',
        ctaText: '',
        backgroundColor: '#FF5733',
        status: 'Active',
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
            ស្លាក
          </label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            placeholder="ឧទាហរណ៍: ទំនិញថ្មី"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ចំណងជើង {!isEditing && '*'}
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="ឧទាហរណ៍: ការប្រមូលរដូវក្តៅ"
            required={!isEditing}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>

      {/* Discount & Status */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ភាគរយបញ្ចុះតម្លៃ (%)
          </label>
          <input
            type="number"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
            placeholder="ឧទាហរណ៍: 25"
            min="0"
            max="100"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ស្ថានភាព
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          >
            <option value="Active">សកម្ម</option>
            <option value="Inactive">អសកម្ម</option>
          </select>
        </div>
      </div>

      {/* CTA Text & Background Color */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            អត្ថបទប៊ូតុង CTA
          </label>
          <input
            type="text"
            name="ctaText"
            value={formData.ctaText}
            onChange={handleChange}
            placeholder="ឧទាហរណ៍: ទិញឥឡូវនេះ"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ពណ៌ផ្ទៃខាងក្រោយ
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              name="backgroundColor"
              value={formData.backgroundColor}
              onChange={handleChange}
              className="w-10 h-10 p-1 bg-gray-50 rounded-lg outline-none cursor-pointer"
            />
            <input
              type="text"
              name="backgroundColor"
              value={formData.backgroundColor}
              onChange={handleChange}
              placeholder="#FF5733"
              className="flex-1 px-3 py-2 text-sm uppercase bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ការពិពណ៌នា
          </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="ការពិពណ៌នាស្លាយ..."
          className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none resize-none focus:ring-2 focus:ring-gray-200"
        />
      </div>



      {/* Submit */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Save size={16} />
          {isEditing ? 'ធ្វើបច្ចុប្បន្នភាពស្លាយ' : 'រក្សាទុកស្លាយ'}
        </button>
      </div>
    </form>
  )
}