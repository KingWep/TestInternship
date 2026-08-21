import { IoGift } from 'react-icons/io5'
import React from 'react'

export default function ProductSelectCard({ product, onSelect }) {
  const isOutOfStock = product.stock === 0

  return (
    <div
      onClick={() => !isOutOfStock && onSelect(product)}
      className={`bg-white border rounded-2xl p-4 shadow-xs flex flex-col justify-between group transition-shadow duration-200
        ${isOutOfStock
          ? 'border-slate-200 opacity-50 cursor-not-allowed'
          : 'border-slate-200 hover:shadow-md hover:border-blue-300 cursor-pointer'
        }`}
    >
      {/* Product image */}
      <div>
        <div className="h-28 bg-slate-100 rounded-xl mb-3 overflow-hidden flex items-center justify-center text-slate-400 font-bold">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform ${!isOutOfStock ? 'group-hover:scale-105' : ''}`}
            />
          ) : (
            <span>📦</span>
          )}
        </div>

        {/* Stock badge */}
        <span
          className={`text-xs px-2 py-1 rounded font-semibold ${
            product.stock === 0
              ? 'bg-red-500 text-white'
              : product.stock <= 10
              ? 'bg-yellow-500 text-white'
              : 'bg-green-600 text-white'
          }`}
        >
          {isOutOfStock ? 'Out of Stock' : `Stock: ${product.stock}`}
        </span>

        <h4 className="font-semibold text-slate-800 text-sm mb-1 mt-2 line-clamp-1">
          {product.name}
        </h4>
      </div>

      {/* Price — salePrice (green) vs originalPrice struck-through (red) */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-green-600 text-sm">
          ${product.salePrice.toFixed(2)}
        </span>
        <span className="font-medium text-red-600 text-sm">
          <del>${product.originalPrice?.toFixed(2) ?? product.salePrice.toFixed(2)}</del>
        </span>
      </div>

      {/* Savings badge */}
      <div className="flex items-center mt-1">
        <IoGift size={18} className="text-blue-500" />
        <span className="text-sm px-2 py-1 font-khmer text-blue-600 rounded">
          សន្សំ ${product.savings ?? 0}
        </span>
      </div>

      {/* CTA button */}
      <span
        className={`text-xs text-center mt-3 px-2.5 py-1 rounded-lg font-semibold transition-colors
          ${isOutOfStock
            ? 'bg-slate-100 text-slate-400'
            : 'bg-blue-500 text-white hover:bg-blue-700 group-hover:text-white transition-transform duration-100 ease-linear'
          }`}
      >
        {isOutOfStock ? 'Unavailable' : 'Add'}
      </span>
    </div>
  )
}