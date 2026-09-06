import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Home from "../client/features/home/pages/Home"
import ProductDetail from "../client/features/products/pages/ProductDetail"

import Receipt from "../client/features/receipt/pages/Receipt"
import GlobalPage from "../global/feature/overview/GlobalPage"
import GlobalLogin from "../global/feature/auth/GlobalLogin"
import GlobalRegister from "../global/feature/auth/GlobalRegister"

// Admin Layout & Pages
import AdminLayout from '../admin/components/layout/AdminLayout'
import AdminCategories from '../admin/features/Categories/pages/AdminCategories'
import AdminSaleForm from '../admin/features/SalesForm/pages/AdminSaleForm'
import AdminOrders from '../admin/features/Order/pages/AdminOrders'
import AdminProducts from '../admin/features/Products/pages/AdminProducts'
import AdminSlides from '../admin/features/Slides/pages/AdminSlides'
import AdminDashboard from '../admin/features/Dashboard/pages/AdminDashboard'
import AdminUsers from '../admin/features/Users/pages/AdminUsers'
import AdminSettings from '../admin/features/Setting/pages/AdminSettings'
import AdminReceiptPage from '../admin/features/Order/pages/AdminReceiptPage'
import AdminStickerPage from '../admin/features/Order/pages/AdminStickerPage'
import AdminQRCode from '../admin/features/QRCode/pages/AdminQRCode'

export default function AppRouter() {
  return (
    <Routes>
      {/* Global Entry Point */}
      <Route path="/" element={<GlobalPage />} />
      <Route path="/login" element={<GlobalLogin />} />
      <Route path="/register" element={<GlobalRegister />} />

      {/* Existing Digital E-Commerce (Moved to /shop) */}
      <Route path="/shop/:shop_code" element={<Home />} />
      <Route path="/shop/:shop_code/products/:id" element={<ProductDetail />} />
      
      <Route path="/print-receipt/:orderId" element={<Receipt />} />
      <Route path="/admin/print-receipt/:id" element={<AdminReceiptPage />} />
      <Route path="/admin/print-sticker/:id" element={<AdminStickerPage />} />
      <Route path="/dashboard" element={<Navigate to="/admin" replace />} />

      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="sale-form" element={<AdminSaleForm />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="slides" element={<AdminSlides />} />
          <Route path="qr-code" element={<AdminQRCode />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>
    </Routes>
  )
}