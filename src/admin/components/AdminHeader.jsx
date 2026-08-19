import React from 'react'

export default function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-xs">
      <h1 className="font-bold text-slate-800 capitalize">Management Dashboard</h1>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
          A
        </div>
        <span className="text-sm font-medium text-slate-600 hidden sm:inline">Admin</span>
      </div>
    </header>
  )
}