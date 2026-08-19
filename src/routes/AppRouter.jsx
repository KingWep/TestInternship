import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import ProductDetail from '../pages/ProductDetail'
import Receipt from '../pages/Receipt'

// Admin Layout & Pages
import AdminLayout from '../admin/components/AdminLayout'
import AdminCategories from '../admin/features/Categories/pages/AdminCategories'
import AdminSaleForm from '../admin/features/SalesForm/pages/AdminSaleForm'
import AdminOrders from '../admin/features/Order/pages/AdminOrders'
import AdminProducts from '../admin/features/Products/pages/AdminProducts'
import AdminSlides from '../admin/features/Slides/pages/AdminSlides'
import AdminDashboard from '../admin/features/Dashboard/pages/AdminDashboard'
import AdminUsers from '../admin/features/Users/pages/AdminUsers'
import AdminSettings from '../admin/features/Setting/pages/AdminSettings'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/receipt/:orderId" element={<Receipt />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard/>} />
        <Route path="products" element={<AdminProducts/>} />
        <Route path="sale-form" element={<AdminSaleForm/>} />
        <Route path="orders" element={<AdminOrders/>} />
        <Route path="users" element={<AdminUsers/>} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="slides" element={<AdminSlides />} />
        <Route path="settings" element={<AdminSettings/>} />
      </Route>
    </Routes>
  )
}