import { ArrowLeft, ShoppingBag } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CheckoutHeader() {
  const navigate = useNavigate()

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-700 transition-colors"
        >
          <ArrowLeft size={18} />
          ត្រឡប់ទៅកន្ត្រក
        </button>

        <div className="flex items-center gap-3 mt-5">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <ShoppingBag
              size={20}
              className="text-red-700"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              បញ្ជាទិញ
            </h1>

            <p className="text-sm text-slate-400">
              បំពេញព័ត៌មានដើម្បីបញ្ចប់ការបញ្ជាទិញ
            </p>
          </div>
        </div>

      </div>
    </header>
  )
}