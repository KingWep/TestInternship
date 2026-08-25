import { IoGift } from 'react-icons/io5'
import React from 'react'

export default function ProductSelectCard({ product, onSelect }) {
  const isOutOfStock = product.stock === 0

  return (
    <div
      onClick={() => !isOutOfStock && onSelect(product)}
      className={`bg-white border rounded-2xl p-3 sm:p-4 shadow-xs flex flex-col justify-between group transition-all duration-200 w-full h-full
        ${isOutOfStock
          ? 'border-slate-200 opacity-50 cursor-not-allowed'
          : 'border-slate-200 hover:shadow-md hover:border-blue-300 cursor-pointer'
        }`}
    >
      {/* Top Section: Image, Stock Badge, & Name */}
      <div>
        {/* Product image with responsive height */}
        <div className="h-24 sm:h-28 bg-slate-100 rounded-xl mb-3 overflow-hidden flex items-center justify-center text-slate-400 font-bold">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-300 ${!isOutOfStock ? 'group-hover:scale-105' : ''}`}
            />
          ) : (
            <span className="text-2xl">📦</span>
          )}
        </div>

        {/* Stock badge */}
        <span
          className={`inline-block text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded font-semibold ${
            product.stock === 0
              ? 'bg-red-500 text-white'
              : product.stock <= 10
              ? 'bg-yellow-500 text-white'
              : 'bg-green-600 text-white'
          }`}
        >
          {isOutOfStock ? 'អស់ពីស្តុក' : `ស្តុក: ${product.stock}`}
        </span>

        {/* Product Name */}
        <h4 className="font-semibold text-slate-800 text-xs sm:text-sm mb-1 mt-2 line-clamp-1" title={product.name}>
          {product.name}
        </h4>
      </div>

      {/* Middle Section: Price Info */}
      <div className="my-1">
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          <span className="font-bold text-green-600 text-xs sm:text-sm">
            ${(product.price ?? 0).toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="font-medium text-red-600 text-[11px] sm:text-sm">
              <del>${product.oldPrice.toFixed(2)}</del>
            </span>
          )}
        </div>

        {/* Savings badge */}
        <div className="flex items-center gap-1 min-h-[24px] sm:min-h-[28px]">
          {(product.oldPrice && product.oldPrice > product.price) ? (
            <>
              <IoGift size={15} className="text-blue-500 flex-shrink-0" />
              <span className="text-[11px] sm:text-sm px-1.5 py-0.5 font-khmer text-blue-600 rounded line-clamp-1">
                សន្សំ ${(product.oldPrice - product.price).toFixed(2)}
              </span>
            </>
          ) : null}
        </div>
      </div>

      {/* CTA button */}
      <div className="mt-2 pt-2 border-t border-slate-50">
        <span
          className={`block w-full text-center text-xs px-2.5 py-1.5 rounded-lg font-semibold transition-colors
            ${isOutOfStock
              ? 'bg-slate-100 text-slate-400'
              : 'bg-blue-500 text-white hover:bg-blue-600 transition-transform duration-100 ease-linear'
            }`}
        >
          {isOutOfStock ? 'មិនមានស្តុក' : 'បន្ថែម'}
        </span>
      </div>
    </div>
  )
}