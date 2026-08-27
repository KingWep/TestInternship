import React, { useState, useEffect } from 'react'
import { Save } from 'lucide-react'

export default function CategoryForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
  })

  // Edit 
  const isEditing = !!initialData

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        slug: initialData.slug || '',
        description: initialData.description || '',
      })
    } else {
      setFormData({
        name: '',
        slug: '',
        description: '',
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target

    // Auto-generate slug
    if (name === 'name' && !isEditing) {
      const autoSlug = value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: autoSlug,
      }))
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name & Slug */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ឈ្មោះប្រភេទ {!isEditing && '*'}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="ឧទាហរណ៍: Skincare"
            required={!isEditing}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Slug {!isEditing && '*'}
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="ឧទាហរណ៍: skincare"
            required={!isEditing}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
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
          placeholder="ការពិពណ៌នាប្រភេទ..."
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
          {isEditing ? 'ធ្វើបច្ចុប្បន្នភាពប្រភេទ' : 'រក្សាទុកប្រភេទ'}
        </button>
      </div>
    </form>
  )
}
