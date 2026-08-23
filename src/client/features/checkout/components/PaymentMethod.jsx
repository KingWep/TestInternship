import { paymentMethods } from "../../../data/paymentMethods"

export default function PaymentMethod({ paymentMethod, setPaymentMethod }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {paymentMethods.map((method) => (
        <button
          key={method.id}
          type="button"
          onClick={() => setPaymentMethod(method.id)}
          className={`flex items-center gap-2 p-3 rounded-xl border text-sm transition ${
            paymentMethod === method.id
              ? "border-red-700 bg-red-50 text-red-900 font-semibold shadow-sm"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
          }`}
        >
          <span>{method.name}</span>
        </button>
      ))}
    </div>
  )
}
