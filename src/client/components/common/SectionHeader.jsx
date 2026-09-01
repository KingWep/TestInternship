import { ArrowRight } from "lucide-react"
export default function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-center gap-1 mb-1">
      <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800 leading-khmer">
      {title}
      </h2>
      {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      {action}
      <ArrowRight size={16} />
    </div>
  )
}