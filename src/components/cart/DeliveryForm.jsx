export default function DeliveryForm({
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
}) {
  const deliveryOptions = [
    {
      id: "grab",
      name: "Grab",
      fee: 2.0,
    },
    {
      id: "wownow",
      name: "Wow Now",
      fee: 1.5,
    },
    {
      id: "jnt",
      name: "J&T",
      fee: 1.25,
    },
    {
      id: "cod",
      name: "COD",
      fee: 0,
    },
  ]

  return (
    <>
      <h3 className="font-semibold text-slate-900">
        ព័ត៌មានដឹកជញ្ជូន
      </h3>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          ឈ្មោះអ្នកទទួល
        </label>

        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="បញ្ចូលឈ្មោះអ្នកទទួល"
          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          លេខទូរស័ព្ទ
        </label>

        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="បញ្ចូលលេខទូរស័ព្ទ"
          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          អាសយដ្ឋាន
        </label>

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="បញ្ចូលអាសយដ្ឋានដឹកជញ្ជូន"
          rows={2}
          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-red-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          ជ្រើសរើសសេវាដឹកជញ្ជូន
        </label>

        <div className="grid grid-cols-2 gap-2">
          {deliveryOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setDeliveryMethod(option.id)
              }}
              className={`flex items-center justify-between border rounded-lg px-3 py-3 text-sm transition ${
                deliveryMethod === option.id
                  ? "border-red-700 bg-red-50 text-red-900"
                  : "border-slate-200 bg-white text-slate-700 hover:border-red-300"
              }`}
            >
              <span className="font-medium">
                {option.name}
              </span>

              <span className="font-semibold">
                {option.fee === 0
                  ? ""
                  : `$${option.fee.toFixed(2)}`}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 flex justify-between text-sm">
        <span className="text-slate-500">
          ថ្លៃដឹកជញ្ជូន
        </span>

        <span className="font-semibold text-slate-900">
          ${deliveryFee.toFixed(2)}
        </span>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          ចំណាំ{" "}
          <span className="text-slate-400 font-normal">
            (មិនចាំបាច់)
          </span>
        </label>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="ឧ. សូមទូរស័ព្ទមុនពេលមកដល់"
          rows={2}
          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-red-100"
        />
      </div>
    </>
  )
}