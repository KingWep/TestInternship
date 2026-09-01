import { useState } from "react"

export default function FilterTabs({ tabs, onChange }) {
  const [active, setActive] = useState(tabs[0])

  const handleClick = (tab) => {
    setActive(tab)
    onChange?.(tab)
  }

  return (
    <>
      <style>{`
        .filter-tabs-scroll::-webkit-scrollbar {
          display: none;
        }
        .filter-tabs-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    <div className="filter-tabs-scroll flex gap-2 overflow-x-auto pb-2">
      {tabs.map((tab) => {
        const isActive = active === tab

        return (
          <button
            key={tab}
            onClick={() => handleClick(tab)}
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 md:px-5 md:py-1.5 text-sm leading-khmer transition-colors duration-150 ${
              isActive
                ? "bg-red-900 text-white font-medium"
                : "bg-red-50 text-slate-700 border border-slate-200 font-normal hover:bg-red-50/70 hover:border-slate-300"
            }`}
          >
            {tab}
          </button>
        )
      })}
    </div>
    </>
  )
}