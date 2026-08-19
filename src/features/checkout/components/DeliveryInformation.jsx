export default function DeliveryInformation({
  customerName, setCustomerName,
  phone, setPhone,
  address, setAddress,
  note, setNote,
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">ឈ្មោះ</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="បញ្ចូលឈ្មោះ"
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">លេខទូរស័ព្ទ</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="បញ្ចូលលេខទូរស័ព្ទ"
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">អាសយដ្ឋាន</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="បញ្ចូលអាសយដ្ឋានដឹកជញ្ជូន"
          rows={2}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">ចំណាំ</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="ចំណាំបន្ថែម (ស្រេចចិត្ត)"
          rows={2}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition"
        />
      </div>
    </div>
  )
}
