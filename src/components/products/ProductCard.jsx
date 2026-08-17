import { Gift } from "lucide-react"
import Badge from "../common/Badge"
import ProductPrice from "./ProductPrice"

export default function ProductCard({ product }) {
  const { name, price, oldPrice, discount, stock, cashback, image } = product

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-56 object-cover" />
        {discount && (
          <div className="absolute top-3 left-3">
            <Badge variant="discount">-{discount}%</Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <Badge variant="stock">ស្តុក: {stock}</Badge>
        </div>
        <h3 className="font-semibold text-slate-900">{name}</h3>

        <ProductPrice price={price} oldPrice={oldPrice} />
        {cashback && (
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-medium">
            <Gift size={14} />
            សន្សំ ${cashback.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  )
}