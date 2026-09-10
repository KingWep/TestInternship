import { useState } from "react"

export default function FilterTabs({ tabs, onChange }) {
  const initialActive = tabs.length > 0 ? (typeof tabs[0] === 'object' ? tabs[0].name : tabs[0]) : ''
  const [active, setActive] = useState(initialActive)

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
    <div className="filter-tabs-scroll flex gap-2 overflow-x-auto pb-2 pt-1">
      {tabs.map((tab, idx) => {
        const tabName = typeof tab === 'object' ? tab.name : tab
        const tabImage = typeof tab === 'object' ? tab.image : null
        const isActive = active === tabName

        return (
          <button
            key={tabName || idx}
            onClick={() => handleClick(tabName)}
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full transition-all duration-200 ${
              tabImage ? "pl-1.5 pr-4 py-1.5" : "px-4 py-2 md:px-5 md:py-2"
            } text-sm leading-khmer ${
              isActive
                ? "bg-red-900 text-white font-medium shadow-md"
                : "bg-red-50 text-slate-700 border border-red-100 font-normal hover:bg-red-100 hover:border-red-200"
            }`}
          >
            {tabImage && (
              <img 
                src={tabImage} 
                alt={tabName} 
                className="w-7 h-7 object-cover rounded-full bg-white border border-slate-200"
              />
            )}
            <span>{tabName}</span>
          </button>
        )
      })}
    </div>
    </>
  )
}