import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import ProductDetail from '../pages/ProductDetail'
import Checkout from '../pages/Checkout'

export default function AppRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail/>} />
        <Route path="/checkout" element={<Checkout/>}/>
        {/* <Route path="*" element={<NotFound/>} /> */}
    </Routes>
  )
}
