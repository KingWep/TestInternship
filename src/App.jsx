import React from "react";

import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { CategoryProvider } from "./context/CategoryContext";
import AppRouter from "./routes/AppRouter";
import ScrollToTop from "./components/common/ScrollToTop";

export default function App() {
  return (
    <div className="w-full">
      <CategoryProvider>
        <ProductProvider>
          <SearchProvider>
            <CartProvider>
              <ScrollToTop/>
              <AppRouter/>
            </CartProvider>
          </SearchProvider>
        </ProductProvider>
      </CategoryProvider>
    </div>
  );
}