import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { saleFormSchema } from '../schemas/saleFormSchema'
import { PackageOpen, X, ShoppingCart } from 'lucide-react'
import OrderCartTable from '../../Order/components/OrderCartTable'
import OrderFormFields from '../../Order/components/OrderFormFields'
import OrderSummaryBox from '../../Order/components/OrderSummaryBox'
import ProductSelectCard from '../components/ProductSelectCard'
import PageHeader from '../../../components/common/PageHeader'
import SearchBar from '../../../components/common/SearchBar'
import FilterBar from '../../../components/common/FilterBar'
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
  } = useSalesForm()

  const [isCartOpen, setIsCartOpen] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(saleFormSchema),
    defaultValues: INITIAL_CUSTOMER,
  })

  const deliveryFee = watch('deliveryFee')

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isCartOpen])

  const onCheckout = async (data) => {
    const result = await handleCheckout({ customerInfo: data })
    if (result) {
      reset()
      setIsCartOpen(false)
    }
  }

  return (
    <div className="flex flex-col lg:h-[calc(100vh-8rem)] gap-4 h-auto">

      <div className="flex flex-col lg:flex-row lg:items-center justify-between flex-shrink-0 gap-4">
        <PageHeader
          title="ទម្រង់លក់ទំនិញ"
          description="កត់ត្រា និងគ្រប់គ្រងប្រតិបត្តិការលក់ប្រកបដោយប្រសិទ្ធភាព។"
        />
        <div className="w-full lg:w-[70%] flex flex-row items-center gap-2 lg:gap-3 lg:justify-end bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex-1 min-w-0">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ស្វែងរកទំនិញ..."
              className="w-full"
            />
          </div>
          <div className="flex-shrink-0">
            <FilterBar
              filters={filterOptions}
              values={filters}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">

        <div className="lg:col-span-7 flex flex-col min-h-0 pb-24 lg:pb-0">
          {filterProducts.length > 0 ? (
            <div className="flex-1 grid grid-cols-2 xl:grid-cols-3 gap-4 lg:overflow-y-auto pr-2 content-start auto-rows-max lg:will-change-scroll lg:overscroll-contain transform-gpu">
              {filterProducts.map((p) => (
                <ProductSelectCard key={p.id} product={p} onSelect={handleAddToCart} />
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-white rounded-xl border border-slate-200 border-dashed h-full min-h-[300px] py-8">
              <PackageOpen size={64} className="mb-4 text-slate-300" strokeWidth={1.5} />
              <h3 className="text-lg font-medium text-slate-600 mb-1">រកមិនឃើញទំនិញ</h3>
              <p className="text-sm">សូមព្យាយាមផ្លាស់ប្តូរការស្វែងរក ឬការដាក់កម្រិតរបស់អ្នក។</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onCheckout)} className={`
          fixed inset-0 z-50 bg-slate-50 flex flex-col p-4 pb-6 overflow-y-auto transition-transform duration-300
          ${isCartOpen ? 'translate-y-0' : 'translate-y-full'} 
          lg:static lg:translate-y-0 lg:z-auto lg:p-0 lg:pb-0 lg:bg-transparent lg:col-span-5 lg:flex lg:flex-col lg:gap-4 lg:overflow-y-auto lg:will-change-scroll lg:overscroll-contain transform-gpu
        `}>
          <div className="lg:hidden flex items-center justify-between mb-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm sticky top-0 z-10 flex-shrink-0">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ShoppingCart size={20} className="text-blue-600" /> 
              ពិនិត្យមើលការបញ្ជាទិញ
            </h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="h-64 flex-shrink-0">
            <OrderCartTable
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>

          <OrderFormFields
            register={register}
            errors={errors}
          />
          
          <OrderSummaryBox
            subtotal={subtotal}
            delivery={deliveryFee}
            disabled={cart.length === 0}
          />
        </form>

      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-slate-200 z-40">
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-3xl py-3 px-4 font-bold flex items-center justify-between transition-colors shadow-md"
        >
            <span className="bg-white/25 text-white px-2.5 py-0.5 rounded-lg text-sm">
              {cart.length} មុខទំនិញ
            </span>
            <span className="text-lg font-semibold">ពិនិត្យការបញ្ជាទិញ</span>
            <span className="text-lg">${subtotal.toFixed(2)}</span>
        </button>
      </div>

    </div>
  )
}