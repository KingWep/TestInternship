export default function CheckoutSummary({ cartTotal, deliveryFee, grandTotal }) {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between text-slate-600">
        <span>តម្លៃផលិតផល</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-slate-600">
        <span>ថ្លៃដឹកជញ្ជូន</span>
        <span>{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : "Free"}</span>
      </div>
      <div className="flex justify-between font-bold text-slate-900 text-base border-t border-slate-100 pt-2 mt-2">
        <span>សរុប</span>
        <span className="text-red-700">${grandTotal.toFixed(2)}</span>
      </div>
    </div>
  )
}
