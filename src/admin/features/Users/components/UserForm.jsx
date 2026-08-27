import React, { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import Swal from 'sweetalert2'

export default function UserForm({ onSubmit, initialData, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User',
    password: '',
    confirmPassword: '',
  })
  const isEditing = !!initialData

  // Sync state when editing data changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        role: initialData.role || 'User',
        password: '',
        confirmPassword: '',
      })
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'User',
        password: '',
        confirmPassword: '',
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isEditing && formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'បរាជ័យ',
        text: 'ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ (Passwords do not match)',
      })
      return
    }
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          ឈ្មោះ {!isEditing && '*'}
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="ឧទាហរណ៍: សុខ សាន្ត"
          required={!isEditing}
          className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

      {/* Email & Role */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            អ៊ីមែល
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ឧទាហរណ៍: user@gmail.com"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            តួនាទី
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          >
            <option value="Admin">អ្នកគ្រប់គ្រង (Admin)</option>
            <option value="User">អ្នកប្រើប្រាស់ (User)</option>
          </select>
        </div>
      </div>

      {/* Password & Confirm Password (Only for Create) */}
      {!isEditing && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              ពាក្យសម្ងាត់ *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="strongpassword"
              required={!isEditing}
              minLength={6}
              className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              បញ្ជាក់ពាក្យសម្ងាត់ *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="strongpassword"
              required={!isEditing}
              minLength={6}
              className={`w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 ${
                formData.confirmPassword && formData.password !== formData.confirmPassword
                  ? 'ring-2 ring-red-400 focus:ring-red-500'
                  : 'focus:ring-gray-200'
              }`}
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ
              </p>
            )}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Save size={16} />
          {isEditing ? 'ធ្វើបច្ចុប្បន្នភាពអ្នកប្រើប្រាស់' : 'រក្សាទុកអ្នកប្រើប្រាស់'}
        </button>
      </div>
    </form>
  )
}