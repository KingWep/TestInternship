import React from 'react'
import { Trash2, Plus, Minus } from 'lucide-react'

export default function OrderCartTable({ cart, onUpdateQuantity, onRemoveItem }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 bg-slate-50 font-bold text-slate-800 text-sm">
        Current Order Cart ({cart.length})
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {cart && cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-800 text-sm truncate">{item.name}</h4>
                <p className="text-xs text-slate-500">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="text-right font-bold text-slate-800 text-sm w-20">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-slate-400 text-sm">
            Cart is empty. Select products to begin.
          </div>
        )}
      </div>
    </div>
  )
}