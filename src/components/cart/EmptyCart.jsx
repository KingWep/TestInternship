export default function EmptyCart() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-2xl">
        🛒
      </div>

      <p className="text-slate-500 font-medium">
        កន្ត្រករបស់អ្នកទទេ
      </p>

      <p className="text-sm text-slate-400 mt-1">
        សូមជ្រើសរើសទំនិញដើម្បីបន្ត
      </p>
    </div>
  )
}