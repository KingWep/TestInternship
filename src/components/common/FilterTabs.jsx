import { useState } from "react"

export default function FilterTabs({ tabs, onChange }) {
  const [active, setActive] = useState(tabs[0])

  const handleClick = (tab) => {
    setActive(tab)
    onChange?.(tab)
  }

  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleClick(tab)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            active === tab
              ? "bg-red-900 text-white"
              : "bg-white text-slate-700 border border-slate-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}