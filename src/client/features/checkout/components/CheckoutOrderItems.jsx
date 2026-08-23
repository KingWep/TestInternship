import { useCart } from "../../../../context/CartContext"

export default function CheckoutOrderItems() {
  const { cartItems } = useCart()

  return (
    <div className="space-y-3">
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">{item.name}</p>
            <p className="text-xs text-slate-400">× {item.quantity}</p>
          </div>
          <span className="text-sm font-semibold text-slate-800 flex-shrink-0">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  )
}
