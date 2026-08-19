import React from 'react'

export default function StatsCard({ title, value, icon: Icon, trend, color = 'blue' }) {
  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        {trend && (
          <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <span>+{trend}%</span> <span className="text-slate-400 font-normal">vs last month</span>
          </p>
        )}
      </div>
      {Icon && (
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorStyles[color]}`}>
          <Icon size={24} />
        </div>
      )}
    </div>
  )
}