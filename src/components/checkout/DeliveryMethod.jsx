import { Truck } from "lucide-react"
import { deliveryOptions } from "../../data/deliveryOptions"

export default function DeliveryMethod({
  deliveryMethod,
  setDeliveryMethod,
}) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-5">
        <Truck size={20} className="text-red-700" />

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            សេវាដឹកជញ្ជូន
          </h2>

          <p className="text-sm text-slate-400">
            ជ្រើសរើសសេវាដឹកជញ្ជូន
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {deliveryOptions.map((option) => {
          const selected =
            deliveryMethod === option.id

          return (
            <button
              key={option.id}
              type="button"
              onClick={() =>
                setDeliveryMethod(option.id)
              }
              className={`text-left p-4 rounded-xl border-2 transition ${
                selected
                  ? "border-red-700 bg-red-50"
                  : "border-slate-200 hover:border-red-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">
                  {option.name}
                </span>

                <span className="font-bold text-red-700">
                  {option.fee === 0
                    ? "Free"
                    : `$${option.fee.toFixed(2)}`}
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-1">
                {option.description}
              </p>
            </button>
          )
        })}
      </div>
    </section>
  )
}