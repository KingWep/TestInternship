import { Search, ShoppingBag } from "lucide-react";
import Container from "./Container";
import { useSearch } from "../../../context/SearchContext";
import { useCart } from "../../../context/CartContext";
import { UserLock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const { searchItem, setSearchItem, priceRange, setPriceRange } = useSearch();
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 md:shadow-md shadow-lg  bg-white md:border-b md:border-slate-100  border-b-2 border-red-800">
      <Container className="w-full py-4">
        {/* Mobile: 2 rows (flex-col) | Desktop: 1 row (md:flex-row) */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          {/* Row 1 on Mobile / Left side on Desktop */}
          <div className="flex items-center justify-between md:justify-start">
            <span className="font-bold text-lg text-red-900 whitespace-nowrap">
              ONE CARE SHOP
            </span>

            {/* Cart on mobile only */}
            <div  className="flex items-center gap-3 md:gap-4 md:hidden">
              <button
                className="relative md:hidden"
                onClick={() => setIsCartOpen(true)}
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
                className=" text-sm text-slate-600 hover:text-slate-900"
              >
                <UserLock />
              </Link>
            </div>
          </div>

          {/* Row 2 on Mobile (Search + Dropdown) / Center & Right on Desktop */}
          <div className="flex flex-1 items-center gap-4">
            <div className="flex-1 relative">
              <Search
                size={16}
                md:size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                placeholder="ស្វែងរក..."
                className="w-full bg-slate-100 rounded-md md:rounded-full pl-10 pr-2 py-0 md:py-2 text-base leading-khmer outline-none focus:ring-2 focus:ring-red-400 placeholder:text-slate-400"
              />
            </div>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-1 py-1 md:px-3 md:py-2 outline-none"
            >
              <option value="all">តម្លៃទាំងអស់</option>
              <option value="under-20">ក្រោម $20</option>
              <option value="20-50">$20 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="over-100">លើស $100</option>
            </select>
          </div>

          {/* Cart on desktop only */}
          <button
            className="relative hidden md:block"
            onClick={() => setIsCartOpen(true)}
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
            className="hidden md:block text-sm text-slate-600 hover:text-slate-900"
          >
            <UserLock />
          </Link>
        </div>
      </Container>
    </header>
  );
}
