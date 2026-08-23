import React from 'react'
export default function FilterBar({
  filters = [],
  values = {},
  onChange,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <select
          key={filter.key}
          value={values[filter.key] || ""}
          onChange={(e) =>
            onChange(filter.key, e.target.value)
          }
          className="rounded-lg border px-3 py-2"
        >
          <option value="" disabled>
            Select {filter.key}
          </option>
          {filter.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ))}
    </div>
  )
}