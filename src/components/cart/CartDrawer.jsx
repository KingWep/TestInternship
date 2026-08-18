import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import CartHeader from "./CartHeader"
import CartItemList from "./CartItemList"
import CartSummary from "./CartSummary"

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    cartTotal,
  } = useCart()

  const hasItems = cartItems.length > 0

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      <div
        className={`fixed right-0 top-0 bottom-0
          w-full sm:w-[420px] md:w-[480px]
          bg-white z-50
          flex flex-col
          shadow-2xl
          rounded-l-3xl
          overflow-hidden
          transition-transform duration-300 ease-in-out
          ${
            isCartOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
      >
        <CartHeader />

        <div className="flex-1 min-h-0 overflow-y-auto p-5">
          {hasItems ? (
            <CartItemList />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-2xl">
                🛒
              </div>

              <p className="text-slate-500 font-medium">
                កន្ត្រករបស់អ្នកទទេ
              </p>

              <p className="text-sm text-slate-400 mt-1">
                សូមជ្រើសរើសទំនិញដើម្បីបន្ត
              </p>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-slate-200 bg-white p-5 space-y-4">

          <CartSummary
            cartTotal={cartTotal}
            deliveryFee={0}
            grandTotal={cartTotal}
            hasItems={hasItems}
          />

          <Link
            to={hasItems ? "/checkout" : "#"}
            onClick={(e) => {
              if (!hasItems) {
                e.preventDefault()
                return
              }

              setIsCartOpen(false)
            }}
            className={`w-full text-center block font-semibold py-3 rounded-full transition ${
              hasItems
                ? "bg-red-900 text-white hover:bg-red-800"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          >
            បន្តទៅការបញ្ជាទិញ
          </Link>

        </div>
      </div>
    </>
  )
}