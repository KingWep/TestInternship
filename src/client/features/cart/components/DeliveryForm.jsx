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
  setQr,
  errors = {}
}) {
  const deliveryOptions = [
    { id: "grab", name: "Grab", fee: 2.0 },
    { id: "wownow", name: "Wow Now", fee: 1.5 },
    { id: "jnt", name: "J&T", fee: 1.25 },
    { id: "vet", name: "VET", fee: 2.5 },
  ]

  const paymentMehtod = [
    {id: "aba", name: "ABA Bank", image: "/images/qrbank.JPG"},
    {id: "wing", name: "Wing", image: "/images/qrbank.JPG"},
    {id: "acleda", name: "ACLEDA", image: "/images/qrbank.JPG"},
    {id: "cash", name: "សាច់ប្រាក់", image: "null"}
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
        <div 
          className={`flex items-center w-full bg-slate-50 border rounded-lg overflow-hidden focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-400 transition ${
            errors.phone ? 'border-red-500' : 'border-slate-200'
          }`}
        >
          <div className="pl-3 pr-2 py-2 text-slate-600 text-sm font-semibold select-none flex items-center bg-slate-100 border-r border-slate-200 h-full">
            +855 <span className="text-slate-300 ml-1.5 text-xs">|</span>
          </div>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => {
              const digitsOnly = e.target.value.replace(/\D/g, '');
              setPhone(digitsOnly);
            }}
            placeholder="12 345 678"
            className="flex-1 px-3 py-2 bg-transparent text-sm outline-none"
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
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
          className={`w-full bg-slate-50 border rounded-lg px-3 py-2 text-sm outline-none resize-none focus:bg-white focus:ring-2 focus:ring-red-100 focus:border-red-400 transition ${
            errors.address ? 'border-red-500' : 'border-slate-200'
          }`}
        />
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address}</p>
        )}
      </div>

      {/* Compact & Clean Delivery Option Selector */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="block text-xs font-medium text-slate-600">
            សេវាដឹកជញ្ជូន
          </label>
          {errors.deliveryMethod && (
            <span className="text-red-500 text-[10px]">{errors.deliveryMethod}</span>
          )}
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {deliveryOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleDeliveryChange(option)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs transition ${
                deliveryMethod === option.id
                  ? "border-red-700 bg-red-50 text-red-900 font-medium shadow-sm"
                  : errors.deliveryMethod
                  ? "border-red-300 bg-red-50/30 text-slate-600 hover:border-red-400"
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
          <div className="flex justify-between items-center mb-1.5 mt-2">
            <label className="block text-xs font-medium text-slate-600">
              សេវាបង់ប្រាក់
            </label>
            {errors.paymentMethod && (
              <span className="text-red-500 text-[10px]">{errors.paymentMethod}</span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {paymentMehtod.map((pay)=>(
              <button
                key={pay.id}
                type="button"
                onClick={() => handlePaymentChange(pay)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs transition ${
                  paymentMethod === pay.id
                    ? "border-red-700 bg-red-50 text-red-900 font-medium shadow-sm"
                    : errors.paymentMethod
                    ? "border-red-300 bg-red-50/30 text-slate-600 hover:border-red-400"
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