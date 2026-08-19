import React from 'react'

export default function OrderFormFields({ customerInfo, onChange, paymentMethod, onPaymentChange }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
      <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Customer Information</h3>
      
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Customer Name</label>
        <input
          type="text"
          name="name"
          value={customerInfo.name}
          onChange={onChange}
          placeholder="Enter customer name"
          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-hidden focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={customerInfo.phone}
          onChange={onChange}
          placeholder="Enter phone number"
          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-hidden focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-2">Payment Method</label>
        <div className="grid grid-cols-2 gap-3">
          {['Cash', 'ABA Pay / QR', 'Card', 'Credit'].map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => onPaymentChange(method)}
              className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                paymentMethod === method 
                  ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs' 
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}