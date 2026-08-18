import { Search, ShoppingBag } from "lucide-react"
import Container from "./Container"
import { useSearch } from "../../context/SearchContext"
import { useCart } from "../../context/CartContext"

export default function Header() {
  const { searchItem, setSearchItem, priceRange, setPriceRange } = useSearch()
  const { cartCount, setIsCartOpen } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md bg-white border-b border-slate-100">
      <Container className="w-full flex flex-row items-center gap-4 py-4">
        <span className="font-bold text-lg text-red-900 whitespace-nowrap">
          ONE CARE SHOP
        </span>
       <div className="flex-1 relative">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type="text"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        placeholder="ស្វែងរក..."
        className="w-full bg-slate-100 rounded-full pl-10 pr-2 py-2 text-base leading-khmer outline-none focus:ring-2 focus:ring-red-400 placeholder:text-slate-400"
      />
    </div>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none"
        >
          <option value="all">តម្លៃទាំងអស់</option>
          <option value="under-20">ក្រោម $20</option>
          <option value="20-50">$20 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="over-100">លើស $100</option>
        </select>

        <button className="relative" onClick={() => setIsCartOpen(true)}>
          <ShoppingBag size={22} className="text-slate-800" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </Container>
    </header>
  )
}