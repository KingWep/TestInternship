import React from 'react'

export default function OrderSummaryBox({ subtotal = 0, discount = 0, delivery = 0, onCheckout, disabled }) {
  const safeSubtotal = Number(subtotal) || 0
  const safeDiscount = Number(discount) || 0
  const safeDelivery = Number(delivery) || 0 
  
  // Total Calculation updated: Tax completely removed
  const total = safeSubtotal - safeDiscount + safeDelivery

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col h-full">
      <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4">Order Summary</h3>
      
      <div className="space-y-3 flex-1">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-800">${safeSubtotal.toFixed(2)}</span>
        </div>

        {/* Conditional rendering for discount */}
        {safeDiscount > 0 && (
          <div className="flex justify-between text-sm text-slate-600 bg-red-50 p-1.5 -mx-1.5 rounded-lg px-2">
            <span className="text-red-600 font-medium">Discount</span>
            <span className="font-bold text-red-600">-${safeDiscount.toFixed(2)}</span>
          </div>
        )}

        {/* Delivery Row gets the bottom border for UI separation */}
        <div className="flex justify-between text-sm text-slate-600 pb-4 border-b border-slate-100">
          <span>Delivery Fee</span>
          <span className="font-semibold text-slate-800">${safeDelivery.toFixed(2)}</span>
        </div>
      </div>

      {/* Emphasized Total Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 my-4 flex justify-between items-center">
        <span className="text-sm font-bold text-slate-700 uppercase">Total Due</span>
        <span className="text-xl font-black text-blue-600">${total.toFixed(2)}</span>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={disabled || total === 0}
        className="w-full py-3.5 bg-blue-500 text-white font-bold text-sm rounded-xl hover:bg-blue-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100 disabled:cursor-not-allowed"
      >
        Complete Order & Send Telegram
      </button>
    </div>
  )
}