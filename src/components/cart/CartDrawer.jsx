import { useState } from "react"
import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "../../context/CartContext"

export default function CartDrawer() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    cartTotal,
    deliveryFee,
    isCartOpen,
    setIsCartOpen,
  } = useCart()

  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  if (!isCartOpen) return null

  const grandTotal = cartTotal + (cartItems.length > 0 ? deliveryFee : 0)

  const handleCheckout = () => {
    if (!phone || !address) {
      alert("សូមបំពេញលេខទូរស័ព្ទ និងអាសយដ្ឋាន")
      return
    }
    if (cartItems.length === 0) {
      alert("កន្ត្រករបស់អ្នកទទេ")
      return
    }
    // ត្រង់នេះអាចហៅ API ដើម្បីបញ្ជូន order
    console.log({ cartItems, phone, address, grandTotal })
    alert("បញ្ជាទិញជោគជ័យ!")
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="flex items-center gap-2 text-lg font-bold text-red-900">
            <ShoppingCart size={20} />
            កន្ត្រករបស់អ្នក
          </h2>
          <button onClick={() => setIsCartOpen(false)}>
            <X size={22} className="text-slate-500" />
          </button>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-slate-400 py-10">
              កន្ត្រករបស់អ្នកទទេ
            </p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium text-slate-900 text-sm">{item.name}</p>
                  <p className="text-red-700 font-bold text-sm">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-2 py-1">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Minus size={14} />
                  </button>
                  <span className="text-sm w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={16} className="text-slate-400 hover:text-red-600" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Delivery info + totals */}
        <div className="bg-slate-50 p-5 space-y-3 border-t border-slate-100">
          <h3 className="font-semibold text-slate-900">ព័ត៌មានដឹកជញ្ជូន</h3>

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="លេខទូរស័ព្ទ"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-100"
          />

          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="អាសយដ្ឋាន"
            rows={2}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-red-100"
          />

          <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-500">
            {deliveryFee.toFixed(2)}
          </div>

          <div className="text-sm space-y-1 pt-1">
            <div className="flex justify-between text-slate-600">
              <span>តម្លៃទំនិញ:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>សេវាដឹកជញ្ជូន:</span>
              <span>${cartItems.length > 0 ? deliveryFee.toFixed(2) : "0.00"}</span>
            </div>
            <div className="flex justify-between font-bold text-red-700 text-base pt-1">
              <span>សរុបរួម:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-red-900 text-white font-medium py-3 rounded-full hover:bg-red-800 transition-colors"
          >
            បញ្ជាទិញឥឡូវនេះ
          </button>
        </div>
      </div>
    </>
  )
}