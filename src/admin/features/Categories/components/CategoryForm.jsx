import React, { useState, useEffect } from 'react'
import { Save } from 'lucide-react'

export default function CategoryForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    status: 'Active',
    description: '',
    image: [],
  })

  // Edit 
  const isEditing = !!initialData

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        slug: initialData.slug || '',
        status: initialData.status || 'Active',
        description: initialData.description || '',
        image: [],
      })
    } else {
      setFormData({
        name: '',
        slug: '',
        status: 'Active',
        description: '',
        image: [],
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData((prev) => ({
      ...prev,
      image: files,
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

      {/* Status */}
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

      {/* Category Image */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          រូបភាពប្រភេទ
        </label>
        <input
          type="file"
          name="image"
          accept="image/jpeg,image/png"
          onChange={handleImageChange}
          className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none"
        />

        {formData.image.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.image.map((file, index) => (
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
                  alt="Current category"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-gray-400 self-end mb-1">
                រូបភាពបច្ចុប្បន្ន
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
          {isEditing ? 'ធ្វើបច្ចុប្បន្នភាពប្រភេទ' : 'រក្សាទុកប្រភេទ'}
        </button>
      </div>
    </form>
  )
}
