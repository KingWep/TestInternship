import { useCart } from "../../../context/CartContext"
import CartItem from "./CartItem"

export default function CartItemList() {
  const { cartItems } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          🛒
        </div>

        <p className="text-slate-500 font-medium">
          កន្ត្រករបស់អ្នកទទេ
        </p>

        <p className="text-sm text-slate-400 mt-1">
          សូមជ្រើសរើសទំនិញដើម្បីបន្ត
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-slate-900">
          ទំនិញ
        </h3>

        <span className="text-sm text-slate-400">
          {cartItems.length} មុខ
        </span>
      </div>

      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
        />
      ))}
    </div>
  )
}