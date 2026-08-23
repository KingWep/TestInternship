import { deliveryOptions } from "../../../data/deliveryOptions"

export default function DeliveryMethod({ deliveryMethod, setDeliveryMethod }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {deliveryOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => setDeliveryMethod(option.id)}
          className={`flex flex-col items-center justify-center p-3 rounded-xl border text-sm transition ${
            deliveryMethod === option.id
              ? "border-red-700 bg-red-50 text-red-900 font-semibold shadow-sm"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
          }`}
        >
          <span className="font-medium">{option.name}</span>
          <span className="text-xs text-slate-500 mt-0.5">
            {option.fee === 0 ? "Free" : `$${option.fee.toFixed(2)}`}
          </span>
        </button>
      ))}
    </div>
  )
}
