import React, { useState } from 'react'
import { PackageOpen } from 'lucide-react'
import OrderCartTable from '../../Order/components/OrderCartTable'
import OrderFormFields from '../../Order/components/OrderFormFields'
import OrderSummaryBox from '../../Order/components/OrderSummaryBox'
import ProductSelectCard from '../components/ProductSelectCard'
import PageHeader from '../../../common/PageHeader'
import SearchBar from '../../../common/SearchBar'
import FilterBar from '../../../common/FilterBar'
import useSalesForm from '../hooks/useSalesForm'

export default function AdminSaleForm() {
  const {
    search,
    setSearch,
    filters,
    handleFilterChange,
    filterOptions,
    filterProducts,
    cart,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleCheckout,
    subtotal,
    INITIAL_CUSTOMER,
    INITIAL_PAYMENT,
  } = useSalesForm()

  const [customerInfo, setCustomerInfo] = useState(INITIAL_CUSTOMER)
  const [paymentMethod, setPaymentMethod] = useState(INITIAL_PAYMENT)

  const onCheckout = () => {
    const result = handleCheckout({ customerInfo, paymentMethod })
    // Only reset form fields if the checkout was successful (not blocked by validation)
    if (result !== null) {
      setCustomerInfo(INITIAL_CUSTOMER)
      setPaymentMethod(INITIAL_PAYMENT)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">

      {/* ── TOP ROW: Header (left) + Filter & Search (right) ── */}
      <div className="flex items-center justify-between flex-shrink-0">
        <PageHeader
          title="Post Sale Form"
          description="Record and manage sales transactions efficiently."
          className="w-[30%]"
        />
        <div className="w-[70%] flex items-center gap-3  justify-end">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
          />
          <FilterBar
            filters={filterOptions}
            values={filters}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* ── BOTTOM SECTION: 12-col grid, fills remaining height ── */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">

        {/* ── Left column: product catalogue (col-span-7) ── */}
        <div className="col-span-7 flex flex-col min-h-0">
          {filterProducts.length > 0 ? (
            <div className="flex-1 grid grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto pr-2 content-start auto-rows-max will-change-scroll overscroll-contain transform-gpu">
              {filterProducts.map((p) => (
                <ProductSelectCard key={p.id} product={p} onSelect={handleAddToCart} />
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-white rounded-xl border border-slate-200 border-dashed h-full">
              <PackageOpen size={64} className="mb-4 text-slate-300" strokeWidth={1.5} />
              <h3 className="text-lg font-medium text-slate-600 mb-1">No products found</h3>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>

        {/* ── Right column: cart + form + summary (col-span-5) ── */}
        <div className="col-span-5 flex flex-col gap-4 overflow-y-auto will-change-scroll overscroll-contain transform-gpu">
          <div className="h-64 flex-shrink-0">
            <OrderCartTable
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>

          <OrderFormFields
            customerInfo={customerInfo}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value })
            }
          />

          {/* ── Payment Method Selector ── */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-3">
              Payment Method
            </h3>
            <div className="flex gap-3">
              {['Cash', 'Card', 'Bank Transfer', 'QR Code'].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`flex-1 py-1 rounded-lg text-sm font-semibold border transition-all ${
                    paymentMethod === method
                      ? 'bg-blue-500 text-white border-blue-500 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <OrderSummaryBox
            subtotal={subtotal}
            onCheckout={onCheckout}
            delivery={customerInfo.deliveryFee}
            disabled={cart.length === 0}
          />
        </div>

      </div>
    </div>
  )
}