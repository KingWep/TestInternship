import React from 'react'
import { ChevronDown } from 'lucide-react'
export default function FilterBar({
  filters = [],
  values = {},
  onChange,
}) {
  return (
    <div className="flex flex-wrap gap-3 w-full sm:w-auto">
      {filters.map((filter) => (
        <div key={filter.key} className="w-full sm:w-auto min-w-[130px] relative">
          <select
            value={values[filter.key] || ""}
            onChange={(e) =>
              onChange(filter.key, e.target.value)
            }
            className="appearance-none block w-full pl-3 pr-8 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm cursor-pointer"
          >
            <option value="" disabled>
              ជ្រើសរើស {filter.key}
            </option>
            {filter.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      ))}
    </div>
  )
}