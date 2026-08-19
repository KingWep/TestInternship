import React from 'react'

export default function OrderSummaryBox({ subtotal = 0, discount = 0, tax = 0, onCheckout, disabled }) {
  const safeSubtotal = Number(subtotal) || 0
  const safeDiscount = Number(discount) || 0
  const safeTax = Number(tax) || 0
  const total = safeSubtotal - safeDiscount + safeTax

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
      <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4">Order Summary</h3>
      
      <div className="flex justify-between text-sm text-slate-600">
        <span>Subtotal</span>
        <span className="font-semibold text-slate-800">${safeSubtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm text-slate-600">
        <span>Discount</span>
        <span className="font-semibold text-red-600">-${safeDiscount.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm text-slate-600 pb-3 border-b border-slate-100">
        <span>Tax (VAT)</span>
        <span className="font-semibold text-slate-800">${safeTax.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-base font-bold text-slate-900 pt-1">
        <span>Total Due</span>
        <span className="text-blue-600">${total.toFixed(2)}</span>
      </div>

      <button
        onClick={onCheckout}
        disabled={disabled}
        className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 shadow-md transition-colors disabled:opacity-50 disabled:pointer-events-none"
      >
        Complete Order & Print Receipt
      </button>
    </div>
  )
}