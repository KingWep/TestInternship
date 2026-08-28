import React, { useState } from "react";
import { Search, ChevronDown, RefreshCw, SlidersHorizontal } from "lucide-react";

export default function OrderFilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  paymentFilter,
  onPaymentChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="flex flex-col gap-3 w-full bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
      
      {/* Top Row: Search & Status + Mobile Filter Toggle */}
      <div className="flex items-center gap-2 w-full">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={onSearchChange}
            className="block w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-xs sm:text-sm"
            placeholder="ស្វែងរក..."
          />
        </div>
        
        <div className="w-[110px] sm:w-44 flex-shrink-0 relative">
          <select
          value={paymentFilter}
          onChange={onPaymentChange}
          className="appearance-none block w-full pl-3 pr-8 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm cursor-pointer"
          >
            <option value="" disabled>ជ្រើសរើស payment</option>
            <option value="ទាំងអស់ (All)">ទាំងអស់</option>
            <option value="Paid">បានទូទាត់</option>
            <option value="Unpaid">មិនទាន់ទូទាត់</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
        {/* Status Dropdown */}
        <div className="w-[110px] sm:w-44 flex-shrink-0 relative">
          <select
            value={statusFilter}
            onChange={onStatusChange}
            className="appearance-none block w-full pl-3 pr-8 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm cursor-pointer"
          >
            <option value="" disabled>ជ្រើសរើស status</option>
            <option value="ទាំងអស់ (All)">ទាំងអស់</option>
            <option value="Pending">រង់ចាំ</option>
            <option value="Pickup">បានយកទំនិញ</option>
            <option value="Delivering">កំពុងដឹក</option>
            <option value="Completed">បានបញ្ចប់</option>
            <option value="Cancelled">បានបោះបង់</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Mobile Filter Toggle Button */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`xl:hidden p-2.5 rounded-xl border transition-colors flex items-center justify-center ${
            showAdvanced || fromDate || toDate
              ? "bg-blue-50 border-blue-200 text-blue-600"
              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
          }`}
          title="ត្រងតាមកាលបរិច្ឆេទ"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Expandable Date Filters */}
      <div
        className={`grid transition-all duration-300 ease-in-out xl:!grid-rows-[1fr] xl:!opacity-100 ${
          showAdvanced ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        } w-full`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100 xl:border-t-0 xl:pt-0 mt-4 xl:mt-0 w-full">
            <div className="w-full sm:flex-1">
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                ចាប់ពីថ្ងៃទី
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={onFromDateChange}
                className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
              />
            </div>

            <div className="w-full sm:flex-1">
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                ដល់ថ្ងៃទី
              </label>
              <input
                type="date"
                value={toDate}
                onChange={onToDateChange}
                className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
              />
            </div>

            {/* Reset Button (Keeps your original reset structure intact) */}
            <div className="w-full sm:w-auto self-end">
              <button
                type="button"
                onClick={() => {
                  onSearchChange({ target: { value: "" } });
                  onStatusChange({ target: { value: "" } });
                  onPaymentChange({ target: { value: "" } });
                  onFromDateChange({ target: { value: "" } });
                  onToDateChange({ target: { value: "" } });
                }}
                className="w-full sm:w-auto px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center gap-2 text-xs sm:text-sm transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>កំណត់ឡើងវិញ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}