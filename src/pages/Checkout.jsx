import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import Swal from "sweetalert2"

import { useCart } from "../context/CartContext"

import DeliveryInformation from "../components/checkout/DeliveryInformation"
import DeliveryMethod from "../components/checkout/DeliveryMethod"
import PaymentMethod from "../components/checkout/PaymentMethod"
import CheckoutOrderItems from "../components/checkout/CheckoutOrderItems"
import CheckoutSummary from "../components/checkout/CheckoutSummary"
import CheckoutButton from "../components/checkout/CheckoutButton"
import ReceiptModal from "../components/receipt/ReceiptModal"

import { deliveryOptions } from "../data/deliveryOptions"
import { paymentMethods } from "../data/paymentMethods"

export default function Checkout() {
  const navigate = useNavigate()

  const {
    cartItems,
    cartTotal,
  } = useCart()

  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [note, setNote] = useState("")

  const [receiptOrder, setReceiptOrder] = useState(null)

  const [deliveryMethod, setDeliveryMethod] =
    useState("")

  const [paymentMethod, setPaymentMethod] =
    useState("")

  const selectedDelivery = deliveryOptions.find(
    (option) => option.id === deliveryMethod
  )

  const deliveryFee = selectedDelivery?.fee ?? 0
  const grandTotal = cartTotal + deliveryFee

  const handleOrder = async () => {
    if (cartItems.length === 0) {
      await Swal.fire({
        icon: "warning",
        title: "កន្ត្រករបស់អ្នកទទេ",
        text: "សូមជ្រើសរើសទំនិញមុនពេលបញ្ជាទិញ",
        confirmButtonText: "យល់ព្រម",
        confirmButtonColor: "#7f1d1d",
      })
      return
    }
    if (!customerName || !phone || !address || !deliveryMethod || !paymentMethod) {
      await Swal.fire({
        icon: "warning",
        title: "ព័ត៌មានមិនទាន់ពេញលេញ",
        text: "សូមបំពេញព័ត៌មានទាំងអស់ មុនពេលបញ្ជាទិញ",
        confirmButtonText: "យល់ព្រម",
        confirmButtonColor: "#7f1d1d",
      })
      return
    }else{
      await Swal.fire({
        icon: "success",
        title: "បញ្ជាទិញបានជោគជ័យ",
        text: "សូមពិនិត្យវិក្កយបត្ររបស់អ្នក",
        confirmButtonText: "យល់ព្រម",
        confirmButtonColor: "#7f1d1d",
      })
    }

    const order = {
      orderId: `ORD-${Date.now()}`,
      date: new Date().toLocaleString("km-KH"),
      customerName,
      phone,
      address,
      note,
      deliveryMethod: selectedDelivery?.name ?? deliveryMethod,
      deliveryFee,
      paymentMethod:
        paymentMethods.find((p) => p.id === paymentMethod)?.name ?? paymentMethod,
      items: cartItems,
      subtotal: cartTotal,
      total: grandTotal,
    }

    try {
      localStorage.setItem(`receipt-${order.orderId}`, JSON.stringify(order))
    } catch (err) {
      console.error("Failed to save receipt to localStorage:", err)
    }

    setReceiptOrder(order)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10 text-center max-w-md w-full">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center text-2xl">
            🛒
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-5">
            កន្ត្រករបស់អ្នកទទេ
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            សូមជ្រើសរើសទំនិញមុនពេលចូលទៅ Checkout
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-red-900 hover:bg-red-800 text-white font-semibold px-7 py-3 rounded-full transition"
          >
            ទៅទិញទំនិញ
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-md font-semibold px-4 py-2 rounded-tl-xl rounded-br-xl bg-red-500  text-white hover:text-red-900 hover:bg-red-300 transition-colors duration-300 ease-in-out"
          >
            <ArrowLeft size={20} />
            ត្រឡប់ទៅទំព័រដើម
          </Link>

          <div className="mt-6">
            <span className="inline-block text-xs font-bold tracking-widest text-red-700 uppercase">
              Checkout
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              បំពេញការបញ្ជាទិញ
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              បំពេញព័ត៌មានខាងក្រោម ដើម្បីបញ្ចប់ការបញ្ជាទិញរបស់អ្នក
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-red-900 text-white flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">ព័ត៌មានអ្នកទទួល</h2>
                  <p className="text-xs text-slate-400 mt-0.5">ព័ត៌មានសម្រាប់ការដឹកជញ្ជូន</p>
                </div>
              </div>
              <div className="px-5 py-4">
                <DeliveryInformation
                  customerName={customerName}
                  setCustomerName={setCustomerName}
                  phone={phone}
                  setPhone={setPhone}
                  address={address}
                  setAddress={setAddress}
                  note={note}
                  setNote={setNote}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-red-900 text-white flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">សេវាដឹកជញ្ជូន</h2>
                  <p className="text-xs text-slate-400 mt-0.5">ជ្រើសរើសអ្នកផ្តល់សេវាដឹកជញ្ជូន</p>
                </div>
              </div>
              <div className="px-5 py-4">
                <DeliveryMethod
                  deliveryMethod={deliveryMethod}
                  setDeliveryMethod={setDeliveryMethod}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-red-900 text-white flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">វិធីបង់ប្រាក់</h2>
                  <p className="text-xs text-slate-400 mt-0.5">ជ្រើសរើសវិធីបង់ប្រាក់ដែលអ្នកពេញចិត្ត</p>
                </div>
              </div>
              <div className="px-5 py-4">
                <PaymentMethod
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-6 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">ការបញ្ជាទិញរបស់អ្នក</h2>
                  <p className="text-xs text-slate-400 mt-1">{cartItems.length} មុខទំនិញ</p>
                </div>
                <span className="text-sm font-semibold text-red-700">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="p-5">
                <CheckoutOrderItems />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <CheckoutSummary
                cartTotal={cartTotal}
                deliveryFee={deliveryFee}
                grandTotal={grandTotal}
              />
              <div className="mt-5 pt-5 border-t border-slate-100">
                <CheckoutButton
                  onClick={handleOrder}
                  total={grandTotal}
                />
              </div>
              <p className="text-[11px] text-center text-slate-400 mt-4 leading-relaxed">
                ដោយចុច "បញ្ជាទិញ" អ្នកយល់ព្រមជាមួយ លក្ខខណ្ឌនៃការបញ្ជាទិញរបស់យើង
              </p>
            </div>
          </div>
        </div>
      </main>

      {receiptOrder && (
        <ReceiptModal
          order={receiptOrder}
          onClose={() => {
            setReceiptOrder(null)
            navigate(`/receipt/${receiptOrder.id}`)
          }}
        />
      )}
    </div>
  )
}