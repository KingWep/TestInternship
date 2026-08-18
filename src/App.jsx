import React from "react";

import Home from "./pages/Home";
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <div className="w-full">
      <SearchProvider>
        <CartProvider>
          <AppRouter/>
          {/* <Home /> */}
        </CartProvider>
      </SearchProvider>
    </div>
  );
}