import { Check } from "lucide-react"
import { paymentMethods } from "../../data/paymentMethods"

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
}) {
  return (
    <div className="grid sm:grid-cols-3 gap-3">

      {paymentMethods.map((method) => {
        const selected = paymentMethod === method.id

        return (
          <button
            key={method.id}
            type="button"
            onClick={() => setPaymentMethod(method.id)}
            className={`
              relative text-left p-3 rounded-lg border
              transition-all
              ${
                selected
                  ? "border-red-700 bg-red-50"
                  : "border-slate-200 bg-white hover:border-red-300"
              }
            `}
          >
            <div className="flex items-center gap-2">

              <div
                className={`
                  w-4 h-4 rounded-full border
                  flex items-center justify-center
                  ${
                    selected
                      ? "border-red-700"
                      : "border-slate-300"
                  }
                `}
              >
                {selected && (
                  <div className="w-2 h-2 rounded-full bg-red-700" />
                )}
              </div>

              <span className="text-sm font-semibold text-slate-900">
                {method.name}
              </span>

            </div>

            <p className="text-xs text-slate-400 mt-1 ml-6">
              {method.description}
            </p>

          </button>
        )
      })}

    </div>
  )
}