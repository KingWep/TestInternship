import React from 'react'
import Container from './components/layout/Container'
import SectionHeader from './components/common/SectionHeader'
import Headers from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import { SearchProvider } from './context/SearchContext'
import { CartProvider } from './context/CartContext'
export default function App() {
  return (
    <div className=" w-full">
      <SearchProvider>
        <CartProvider>
          <Home/>
        </CartProvider>
      </SearchProvider>
    </div>
  )
}
