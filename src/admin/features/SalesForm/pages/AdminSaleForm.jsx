import React, { useState } from 'react'
import OrderCartTable from '../../Order/components/OrderCartTable'
import OrderFormFields from '../../Order/components/OrderFormFields'
import OrderSummaryBox from '../../Order/components/OrderSummaryBox'
import ProductSelectCard from '../components/ProductSelectCard'
import PageHeader from '../../../common/PageHeader'

export default function AdminSaleForm() {
  const [cart, setCart] = useState([])
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' })
  const [paymentMethod, setPaymentMethod] = useState('Cash')

  const dummyProducts = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, stock: 15 },
    { id: 2, name: 'Smart Watch Series 5', price: 199.99, stock: 8 },
    { id: 3, name: 'Bluetooth Speaker', price: 45.00, stock: 20 },
  ]

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const handleUpdateQuantity = (id, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity: qty } : item))
    }
  }

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
      <div className="lg:col-span-7 flex flex-col gap-6 overflow-hidden">
      <div>
        <PageHeader 
          title="Post Sale Form"
          description="Record and manage sales transactions efficiently."
        />
      </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto pr-2">
          {dummyProducts.map((p) => (
            <ProductSelectCard key={p.id} product={p} onSelect={handleAddToCart} />
          ))}
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-4 overflow-y-auto">
        <div className="h-64">
          <OrderCartTable cart={cart} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />
        </div>
        <OrderFormFields 
          customerInfo={customerInfo} 
          onChange={(e) => setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value })} 
          paymentMethod={paymentMethod} 
          onPaymentChange={setPaymentMethod} 
        />
        <OrderSummaryBox 
          subtotal={subtotal} 
          onCheckout={() => alert('Order Complete!')} 
          disabled={cart.length === 0} 
        />
      </div>
    </div>
  )
}