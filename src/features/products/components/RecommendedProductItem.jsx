import { Link } from "react-router-dom"
import { Gift } from "lucide-react"

export default function RecommendedProductItem({ product }) {
  const {
    id,
    name,
    price,
    oldPrice,
    discount,
    cashback,
    image,
  } = product

  return (
    <Link
      to={`/products/${id}`}
      className="group flex gap-4 p-3 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow"
    >

      <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {discount && (
          <span className="absolute top-1 left-1 bg-red-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
            -{discount}%
          </span>
        )}
      </div>

      <div className="flex flex-col justify-center min-w-0">
        <h3 className="font-semibold text-slate-900 truncate group-hover:text-red-700 transition-colors">
          {name}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-red-700 font-bold">
            ${price.toFixed(2)}
          </span>

          {oldPrice && (
            <span className="text-sm text-slate-400 line-through">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>
        {cashback && (
          <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
            <Gift size={13} />
            Cashback ${cashback.toFixed(2)}
          </div>
        )}
      </div>
    </Link>
  )
}