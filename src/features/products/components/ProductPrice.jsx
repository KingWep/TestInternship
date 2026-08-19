import React from 'react'

export default function ProductPrice({ price, oldPrice }) {
  return (
    <div className="flex items-center gap-2 mt-1">
      <span className="text-red-700 font-bold text-lg">${price.toFixed(2)}</span>
      {oldPrice && (
        <span className="text-slate-400 text-sm line-through">${oldPrice.toFixed(2)}</span>
      )}
    </div>
  )
}