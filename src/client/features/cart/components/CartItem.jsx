import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "../../../../context/CartContext"

export default function CartItem({ item }) {
  const {
    updateQuantity,
    removeFromCart,
  } = useCart()

  return (
    <div className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2">
          <p className="font-semibold text-sm text-slate-900 truncate">
            {item.name}
          </p>

          <button
            onClick={() => removeFromCart(item.id)}
            className="shrink-0"
          >
            <Trash2
              size={16}
              className="text-slate-400 hover:text-red-600"
            />
          </button>
        </div>

        <p className="text-red-700 font-bold text-sm mt-1">
          ${item.price.toFixed(2)}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-slate-200 bg-white rounded-lg overflow-hidden">
            <button
              onClick={() =>
                updateQuantity(
                  item.id,
                  item.quantity - 1
                )
              }
              className="w-8 h-8 flex items-center justify-center hover:bg-slate-100"
            >
              <Minus size={14} />
            </button>

            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>

            <button
              onClick={() =>
                updateQuantity(
                  item.id,
                  item.quantity + 1
                )
              }
              className="w-8 h-8 flex items-center justify-center hover:bg-slate-100"
            >
              <Plus size={14} />
            </button>
          </div>

          <p className="font-semibold text-sm text-slate-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}