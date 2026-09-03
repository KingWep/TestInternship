import { Search, ShoppingBag, UserLock } from "lucide-react";
import Container from "./Container";
import { useSearch } from "../../../context/SearchContext";
import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { searchItem, setSearchItem, priceRange, setPriceRange } = useSearch();
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 md:shadow-md shadow-lg bg-white md:border-b md:border-slate-100 border-b-2 border-red-800">
      <Container className="w-full py-4">
        {/* Mobile: 2 rows (flex-col) | Desktop: 1 row (md:flex-row) */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          
          {/* Row 1 on Mobile / Left side on Desktop */}
          <div className="flex items-center justify-between md:justify-start">
            <span className="font-bold text-lg text-red-900 whitespace-nowrap">
              ONE CARE SHOP
            </span>

            {/* Mobile Actions */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                className="relative"
                onClick={() => setIsCartOpen(true)}
                aria-label="Open cart"
              >
                <ShoppingBag size={22} className="text-slate-800" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              <Link
                to="/admin/login"
                className="text-sm text-slate-600 hover:text-slate-900"
                aria-label="Admin Login"
              >
                <UserLock size={22} />
              </Link>
            </div>
          </div>

          {/* Row 2 on Mobile / Center on Desktop */}
          <div className="flex flex-1 items-center gap-2 md:gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 md:w-5 md:h-5"
              />
              <input
                type="text"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                placeholder="ស្វែងរក..."
                className="w-full bg-slate-100 rounded-md md:rounded-full pl-9 md:pl-11 pr-3 py-0 md:py-2 text-base leading-khmer outline-none focus:ring-2 focus:ring-red-400 placeholder:text-slate-400 transition-all"
              />
            </div>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="text-sm border border-slate-200 rounded-md md:rounded-lg px-2 py-2 md:px-3 outline-none focus:ring-2 focus:ring-red-400 bg-white"
              aria-label="Filter by price"
            >
              <option value="all">តម្លៃទាំងអស់</option>
              <option value="under-20">ក្រោម $20</option>
              <option value="20-50">$20 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="over-100">លើស $100</option>
            </select>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              className="relative"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingBag size={24} className="text-slate-800 hover:text-red-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              to="/admin/login"
              className="text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Admin Login"
            >
              <UserLock size={24} />
            </Link>
          </div>

        </div>
      </Container>
    </header>
  );
}