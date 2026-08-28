import React from 'react'

export default function OrderFormFields({ customerInfo, onChange }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
      <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">ព័ត៌មានអតិថិជន</h3>

      {/* Phone Number */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">លេខទូរស័ព្ទ</label>
        <input
          type="text"
          name="phone"
          value={customerInfo.customerPhone}
          onChange={onChange}
          placeholder="បញ្ចូលលេខទូរស័ព្ទ"
          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-hidden focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">អាសយដ្ឋាន</label>
        <textarea
          name="address"
          value={customerInfo.customerAddress}
          onChange={onChange}
          placeholder="បញ្ចូលអាសយដ្ឋាន"
          rows={3}
          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-hidden focus:border-blue-500 transition-colors resize-y"
        />
      </div>

      {/* Delivery Fee */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">សេវាដឹកជញ្ជូន ($)</label>
        <input
          type="number"
          name="deliveryFee"
          value={customerInfo.deliveryFee || ''}
          onChange={onChange}
          min="0"
          step="0.50"
          placeholder="0.00"
          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-hidden focus:border-blue-500 transition-colors"
        />
      </div>
    </div>
  )
}