import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search } from 'lucide-react'

function CustomSelect({ filter, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Support both:
  // 1. String: 'Admin'
  // 2. Object: { label: 'អ្នកគ្រប់គ្រង', value: 'Admin' }
  const normalizedOptions = filter.options.map((option) =>
    typeof option === 'string'
      ? {
          label: option,
          value: option,
        }
      : option
  )

  const filteredOptions = normalizedOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedOption = normalizedOptions.find(
    (option) => option.value === value
  )

  return (
    <div
      className="relative w-full sm:w-auto min-w-[130px]"
      ref={ref}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="appearance-none flex justify-between items-center w-full pl-3 pr-8 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm cursor-pointer text-left"
      >
        <span className="truncate">
          {selectedOption?.label ||
            value ||
            `ជ្រើសរើស ${filter.key}`}
        </span>

        <ChevronDown className="absolute right-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full min-w-[160px] mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 flex flex-col">
          {filter.searchable && (
            <div className="p-2 border-b border-slate-100 shrink-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />

                <input
                  type="text"
                  placeholder="ស្វែងរក..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}

          <ul className="overflow-y-auto py-1">

            <li className="px-3 py-2 text-xs sm:text-sm text-slate-400 bg-slate-100 cursor-not-allowed">
              ជ្រើសរើស {filter.key}
            </li>

            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(filter.key, option.value)
                    setIsOpen(false)
                    setSearchTerm('')
                  }}
                  className={`
                    px-3 py-2 text-xs sm:text-sm cursor-pointer
                    hover:bg-slate-50
                    ${
                      value === option.value
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-slate-700'
                    }
                  `}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-xs text-slate-500 text-center">
                គ្មានលទ្ធផល
              </li>
            )}

          </ul>
        </div>
      )}
    </div>
  )
}

export default function FilterBar({
  filters = [],
  values = {},
  onChange,
}) {
  return (
    <div className="flex flex-wrap gap-3 w-full sm:w-auto">
      {filters.map((filter) => (
        <CustomSelect
          key={filter.key}
          filter={filter}
          value={values[filter.key]}
          onChange={onChange}
        />
      ))}
    </div>
  )
}