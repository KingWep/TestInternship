import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import ProductDetail from '../pages/ProductDetail'
// import Checkout from '../pages/Checkout'
import Receipt from '../pages/Receipt'

export default function AppRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail/>} />
        <Route path="/receipt/:orderId" element={<Receipt />}/>
        {/* <Route path="/checkout" element={<Checkout/>}/> */}
    </Routes>
  )
}