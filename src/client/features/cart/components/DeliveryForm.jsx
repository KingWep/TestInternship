export function DeliveryForm({
  customerName,
  setCustomerName,
  phone,
  setPhone,
  address,
  setAddress,
  note,
  setNote,
  deliveryMethod,
  setDeliveryMethod,
  deliveryFee,
  setDeliveryFee,
  paymentMethod,
  setPaymentMethod,
  paymentImage,
  setPaymentImage,
  setQr
}) {
  const deliveryOptions = [
    { id: "grab", name: "Grab", fee: 2.0 },
    { id: "wownow", name: "Wow Now", fee: 1.5 },
    { id: "jnt", name: "J&T", fee: 1.25 },
    { id: "vet", name: "VET", fee: 2.5 },
  ]

  const paymentMehtod = [
    {id: "aba", name: "ABA Bank", image: "/images/qr.png"},
    {id: "wing", name: "Wing", image: "/images/qr.png"},
    {id: "ac", name: "ACLEDA", image: "/images/qr.png"},
    {id: "cash", name: "Case", image: "null"}
  ]
  const handleDeliveryChange = (option) => {
    setDeliveryMethod(option.id)
    if (setDeliveryFee) {
      setDeliveryFee(option.fee)
    }
  }

  const handlePaymentChange = (paymentMethod) =>{
    setPaymentMethod(paymentMethod.id)
    setPaymentImage(paymentMethod.image) 
  }

  return (
    <div className="space-y-4 pt-4 border-t border-slate-100">
      <h3 className="font-semibold text-slate-900">
        ព័ត៌មានដឹកជញ្ជូន
      </h3>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">
          លេខទូរស័ព្ទ
        </label>
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="បញ្ចូលលេខទូរស័ព្ទ"
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-red-100 focus:border-red-400 transition"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">
          អាស័យដ្ឋាន
        </label>
        <textarea
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="បញ្ចូលអាសយដ្ឋានដឹកជញ្ជូន"
          rows={2}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none resize-none focus:bg-white focus:ring-2 focus:ring-red-100 focus:border-red-400 transition"
        />
      </div>

      {/* Compact & Clean Delivery Option Selector */}
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1.5">
          សេវាដឹកជញ្ជូន
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {deliveryOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleDeliveryChange(option)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs transition ${
                deliveryMethod === option.id
                  ? "border-red-700 bg-red-50 text-red-900 font-medium shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <span className="truncate w-full text-center">{option.name}</span>
              <span className="text-[11px] text-slate-500 mt-0.5 font-semibold">
                {option.fee === 0 ? "$$" : `$${option.fee.toFixed(2)}`}
              </span>
            </button>
          ))}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5 mt-2">
            សេវាបង់ប្រាក់
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {paymentMehtod.map((pay)=>(
              <button
                key={pay.id}
                type="button"
                onClick={() => handlePaymentChange(pay)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs transition ${
                  paymentMethod === pay.id
                    ? "border-red-700 bg-red-50 text-red-900 font-medium shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <span className="truncate w-full text-center">{pay.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}