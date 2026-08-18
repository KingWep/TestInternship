export default function CheckoutSummary({
  cartTotal,
  deliveryFee,
  grandTotal,
}) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5">
      <h2 className="font-bold text-slate-900 mb-4">
        សង្ខេបការបញ្ជាទិញ
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-500">
          <span>តម្លៃទំនិញ</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-slate-500">
          <span>សេវាដឹកជញ្ជូន</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>

        <div className="border-t border-slate-100 pt-3 flex justify-between">
          <span className="font-bold">
            សរុប
          </span>

          <span className="font-bold text-lg text-red-700">
            ${grandTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </section>
  )
}