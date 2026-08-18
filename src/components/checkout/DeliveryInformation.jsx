export default function DeliveryInformation({
  customerName,
  setCustomerName,
  phone,
  setPhone,
  address,
  setAddress,
  note,
  setNote,
}) {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            ឈ្មោះអ្នកទទួល
          </label>

          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="ឈ្មោះអ្នកទទួល"
            className="w-full h-11 px-3.5 text-sm
              border border-slate-200 rounded-lg
              outline-none
              focus:border-red-500
              focus:ring-2 focus:ring-red-50
              transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            លេខទូរស័ព្ទ
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="012 345 678"
            className="w-full h-11 px-3.5 text-sm
              border border-slate-200 rounded-lg
              outline-none
              focus:border-red-500
              focus:ring-2 focus:ring-red-50
              transition"
          />
        </div>

      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          អាសយដ្ឋាន
        </label>

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="ផ្ទះលេខ, ផ្លូវ, សង្កាត់, ខណ្ឌ..."
          rows={2}
          className="w-full px-3.5 py-2.5 text-sm
            border border-slate-200 rounded-lg
            outline-none resize-none
            focus:border-red-500
            focus:ring-2 focus:ring-red-50
            transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          ចំណាំ
          <span className="text-xs text-slate-400 ml-1">
            (optional)
          </span>
        </label>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="ឧ. សូមទូរស័ព្ទមុនពេលមកដល់..."
          rows={2}
          className="w-full px-3.5 py-2.5 text-sm
            border border-slate-200 rounded-lg
            outline-none resize-none
            focus:border-red-500
            focus:ring-2 focus:ring-red-50
            transition"
        />
      </div>

    </div>
  )
}