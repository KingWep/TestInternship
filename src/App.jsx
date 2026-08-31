import React from "react";

import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";

import { AdminAuthProvider } from "./context/AdminAuthContext";
import AppRouter from "./routes/AppRouter";
import ScrollToTop from "./client/components/common/ScrollToTop";

export default function App() {
  return (
    <div className="w-full">
      <SearchProvider>
        <CartProvider>
          <ScrollToTop />
          <AdminAuthProvider>
            <AppRouter />
          </AdminAuthProvider>
        </CartProvider>
      </SearchProvider>
    </div>
  );
}