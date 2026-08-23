import { useState } from "react"
import {
  Sparkles,
  Flower2,
  Droplet,
  Bath,
  Scissors,
  Brush,
  FlaskConical,
  Hand,
  Zap,
  Sun,
  Smile,
} from "lucide-react"

const ICONS = {
  "ទាំងអស់": Sparkles,
  "all": Sparkles,
  "cosmetic": Flower2,
  "skincare": Droplet,
  "body care": Bath,
  "hair care": Scissors,
  "makeup": Brush,
  "fragrance": FlaskConical,
  "nail care": Hand,
  "men's grooming": Zap,
  "sun care": Sun,
  "oral care": Smile,
}

function iconFor(tab) {
  return ICONS[tab] || ICONS[tab.toLowerCase()] || Sparkles
}

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
        const Icon = iconFor(tab)
        const isActive = active === tab

        return (
          <button
            key={tab}
            onClick={() => handleClick(tab)}
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm leading-khmer transition-colors duration-150 ${
              isActive
                ? "bg-red-900 text-white font-medium"
                : "bg-red-50 text-slate-700 border border-slate-200 font-normal hover:bg-red-50/70 hover:border-slate-300"
            }`}
          >
            <Icon
              size={16}
              strokeWidth={1.75}
              className={isActive ? "text-white" : "text-slate-500"}
            />
            {tab}
          </button>
        )
      })}
    </div>
    </>
  )
}