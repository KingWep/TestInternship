import React from 'react'

export default function ProductSelectCard({ product, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(product)}
      className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        <div className="h-28 bg-slate-100 rounded-xl mb-3 overflow-hidden flex items-center justify-center text-slate-400 font-bold">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          ) : (
            <span>📦</span>
          )}
        </div>
        <h4 className="font-semibold text-slate-800 text-sm mb-1 line-clamp-1">{product.name}</h4>
        <p className="text-xs text-slate-500">Stock: {product.stock ?? 10}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-bold text-blue-600 text-sm">${product.price.toFixed(2)}</span>
        <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors">
          Add
        </span>
      </div>
    </div>
  )
}