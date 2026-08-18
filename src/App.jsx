import React from "react";

import Home from "./pages/Home";
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";
import AppRouter from "./routes/AppRouter";
import ScrollToTop from "./components/common/ScrollToTop";

export default function App() {
  return (
    <div className="w-full">
      <SearchProvider>
        <CartProvider>
          <ScrollToTop/>
          <AppRouter/>
        </CartProvider>
      </SearchProvider>
    </div>
  );
}