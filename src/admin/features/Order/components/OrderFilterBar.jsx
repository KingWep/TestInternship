import React from 'react'
import { Search, ChevronDown, RefreshCw } from 'lucide-react'

export default function OrderFilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange
}) {
  return (
    <div className=" flex flex-wrap gap-4 items-end">
      
      {/* Search Input */}
      <div className="flex-1 min-w-[250px]">
        <label className="block text-sm font-medium text-slate-600 mb-2">
          ស្វែងរក (លេខវិក្ក័យបត្រ / ទូរស័ព្ទ)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={onSearchChange}
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors text-sm"
            placeholder="បញ្ចូលលេខវិក្ក័យបត្រ ឬ ទូរស័ព្ទ..."
          />
        </div>
      </div>

      {/* Status Select */}
      <div className="w-full sm:w-auto min-w-[150px]">
        <label className="block text-sm font-medium text-slate-600 mb-2">
          ស្ថានភាព (Status)
        </label>
        <div className="relative">
          <select 
            value={statusFilter}
            onChange={onStatusChange}
            className="appearance-none block w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors text-sm cursor-pointer"
          >
            <option>ទាំងអស់ (All)</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* From Date */}
      <div className="w-full sm:w-auto min-w-[150px]">
        <label className="block text-sm font-medium text-slate-600 mb-2">
          ចាប់ពីថ្ងៃទី
        </label>
        <div className="relative">
          <input
            type="date"
            value={fromDate}
            onChange={onFromDateChange}
            className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors text-sm"
          />
        </div>
      </div>

      {/* To Date */}
      <div className="w-full sm:w-auto min-w-[150px]">
        <label className="block text-sm font-medium text-slate-600 mb-2">
          ដល់ថ្ងៃទី
        </label>
        <div className="relative">
          <input
            type="date"
            value={toDate}
            onChange={onToDateChange}
            className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors text-sm"
          />
        </div>
      </div>

      {/* Refresh Button */}
      <button 
        onClick={() => {
          onSearchChange({ target: { value: '' } });
          onStatusChange({ target: { value: 'ទាំងអស់ (All)' } });
          onFromDateChange({ target: { value: '' } });
          onToDateChange({ target: { value: '' } });
        }}
        className="h-[42px] px-4 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
      </button>

    </div>
  )
}
