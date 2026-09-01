import { useState } from "react"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

import { useCart } from "../../../../context/CartContext"
import { useCreateOrderMutation } from "../../../../queries/orders/useOrderQueries"

import CartHeader from "./CartHeader"
import CartItemList from "./CartItemList"
import CartSummary from "./CartSummary"
import PaymentQrModal from "./PaymentQrModal"
import EmptyCart from "./EmptyCart"
import useCheckout from "../hooks/useCheckout"
import { DeliveryForm } from "./DeliveryForm"
import { clientOrderSchema } from "../schemas/clientOrderSchema"

export default function CartDrawer() {
  const navigate = useNavigate()
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    cartTotal,
    clearCart,
  } = useCart()
  
  const createOrderMutation = useCreateOrderMutation()

  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [note, setNote] = useState("")

  const [deliveryMethod, setDeliveryMethod] = useState("")
  const [deliveryFee, setDeliveryFee] = useState(2.0)

  const [paymentMethod, setPaymentMethod] = useState("")
  const [paymentImage, setPaymentImage] = useState(null)
  const hasItems = cartItems.length > 0

  const [errors, setErrors] = useState({})

  const grandTotal =
    cartTotal + (hasItems ? deliveryFee : 0)

  const handleCreateOrder = (formattedPhone) => {
    return createOrderMutation.mutateAsync({
      items: cartItems,
      subtotal: cartTotal,
      delivery: deliveryFee,
      paymentMethod: paymentMethod === 'cash' ? 'Cash' : 'QR Payment',
      customerInfo: {
        name: customerName,
        phone: formattedPhone,
        address,
        note,
        deliveryMethod,
      }
    });
  }

  const resetCheckoutForm = () => {
    setCustomerName("")
    setPhone("")
    setAddress("")
    setNote("")
    setDeliveryMethod("")
    setPaymentMethod("")
    setPaymentImage(null)
    setErrors({})
    clearCart() // clear data in cart
  }

  const {
    showQr,
    qrSeconds,
    startQrPayment,
    closeQr,
  } = useCheckout({
    hasItems,
    grandTotal,
    setIsCartOpen,
    resetCheckoutForm, // ✅ បញ្ជូន resetCheckoutForm ចូលទីនេះ
    navigate, // ✅ Pass navigate to useCheckout
  })

  const handleOrder = async () => {
    const dataToValidate = { phone, address, deliveryMethod, paymentMethod };
    const result = clientOrderSchema.safeParse(dataToValidate);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const formattedErrors = {};
      for (const key in fieldErrors) {
        formattedErrors[key] = fieldErrors[key][0];
      }
      setErrors(formattedErrors);
      return;
    }

    setErrors({});
    const formattedPhone = result.data.phone;

    if (paymentMethod === "cash") {
      await handleCashOrder(formattedPhone)
      return
    }

    try {
      const newOrder = await handleCreateOrder(formattedPhone)
      startQrPayment(newOrder.id)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "បរាជ័យ",
        text: "មានបញ្ហាក្នុងការបង្កើតការបញ្ជាទិញ",
        confirmButtonColor: "#7f1d1d",
      })
    }
  }

  const handleCashOrder = async (formattedPhone) => {
    try {
      const newOrder = await handleCreateOrder(formattedPhone)
      resetCheckoutForm()
      
      await Swal.fire({
        icon: "success",
        title: "បញ្ជាទិញជោគជ័យ 🎉",
        text: `ចំនួនសរុប $${grandTotal.toFixed(2)}`,
        confirmButtonText: "យល់ព្រម",
        confirmButtonColor: "#7f1d1d",
        allowOutsideClick: false,
      })

      const result = await Swal.fire({
        icon: "question",
        title: "បោះពុម្ពវិក្កយបត្រ?",
        text: "តើអ្នកចង់បោះពុម្ពវិក្កយបត្រដែរឬទេ?",
        showCancelButton: true,
        confirmButtonText: "🖨️ បោះពុម្ពវិក្កយបត្រ",
        cancelButtonText: "រំលង",
        confirmButtonColor: "#7f1d1d",
        cancelButtonColor: "#64748b",
      })

      if (result.isConfirmed) {
        navigate(`/print-receipt/${newOrder.id}`)
      } else {
        setIsCartOpen(false)
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "បរាជ័យ",
        text: "មានបញ្ហាក្នុងការបង្កើតការបញ្ជាទិញ",
        confirmButtonColor: "#7f1d1d",
      })
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />
      <div
        className={`fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] md:w-[480px] bg-white flex flex-col shadow-2xl md:rounded-l-3xl overflow-hidden transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <CartHeader />
        <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-6">
          {hasItems ? (
            <>
              <CartItemList />
              <DeliveryForm
                customerName={customerName}
                setCustomerName={setCustomerName}
                phone={phone}
                setPhone={setPhone}
                address={address}
                setAddress={setAddress}
                note={note}
                setNote={setNote}
                deliveryMethod={deliveryMethod}
                setDeliveryMethod={setDeliveryMethod}
                deliveryFee={deliveryFee}
                setDeliveryFee={setDeliveryFee}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                paymentImage={paymentImage}
                setPaymentImage={setPaymentImage}
                errors={errors}
              />
            </>
          ) : (
            <EmptyCart />
          )}
        </div>
        <div className="shrink-0 border-t border-slate-200 bg-white p-5 space-y-4">
          <CartSummary
            cartTotal={cartTotal}
            deliveryFee={deliveryFee}
            grandTotal={grandTotal}
            hasItems={hasItems}
          />
          <button
            type="button"
            onClick={handleOrder}
            disabled={!hasItems}
            className={`w-full py-2 rounded-full font-semibold transition ${
              hasItems
                ? "bg-red-900 text-white hover:bg-red-800"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          >
            បន្តទៅការបញ្ជាទិញ
          </button>
        </div>
      </div>

      <PaymentQrModal
        showQr={showQr}
        paymentMethod={paymentMethod}
        paymentImage={paymentImage}
        grandTotal={grandTotal}
        qrSeconds={qrSeconds}
        onClose={closeQr}
      />
    </>
  )
}