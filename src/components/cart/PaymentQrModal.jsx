export default function PaymentQrModal({
  showQr,
  paymentMethod,
  paymentImage,
  grandTotal,
  qrSeconds,
  onClose,
}) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4
        transition-all duration-300 ease-out
        ${
          showQr
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
    >
      <div
        className={`relative w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl
          transition-all duration-300 ease-out
          ${
            showQr
              ? "scale-100 translate-y-0 opacity-100"
              : "scale-90 translate-y-5 opacity-0"
          }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8
            items-center justify-center rounded-full
            bg-slate-100 text-slate-600
            transition-all duration-200
            hover:bg-slate-200
            hover:scale-110
            active:scale-95"
        >
          ✕
        </button>

        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-900">
            បង់ប្រាក់តាម {paymentMethod.toUpperCase()}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            សូមស្កេន QR Code ដើម្បីបង់ប្រាក់
          </p>

          {/* QR */}
          <div className="mt-5 flex justify-center">
            <img
              src={paymentImage}
              alt={`${paymentMethod} QR Code`}
              className="h-64 w-60 object-contain"
            />
          </div>

          {/* Amount */}
          <div className="mt-4 rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500">
              ចំនួនត្រូវបង់
            </p>

            <p className="text-2xl font-bold text-red-900">
              ${grandTotal.toFixed(2)}
            </p>
          </div>

          {/* Countdown */}
          <div className="mt-4 rounded-xl p-3">
            <p className="text-xs text-slate-500">
              QR Code នឹងបិទក្នុង
            </p>

            <p className="mt-1 text-2xl font-bold text-red-900">
              {qrSeconds}
              <span className="ml-1 text-sm font-medium">
                វិនាទី
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}