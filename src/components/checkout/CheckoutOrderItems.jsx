import { useCart } from "../../context/CartContext"

export default function CheckoutOrderItems() {
  const { cartItems } = useCart()

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex justify-between mb-4">
        <h2 className="font-bold text-slate-900">
          ទំនិញរបស់អ្នក
        </h2>

        <span className="text-sm text-slate-400">
          {cartItems.length} មុខ
        </span>
      </div>

      <div className="space-y-4 max-h-[350px] overflow-y-auto">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-3"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover"
            />

            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {item.name}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Qty: {item.quantity}
              </p>
            </div>

            <p className="font-semibold text-sm">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}