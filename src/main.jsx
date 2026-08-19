import React from "react";
import ReactDOM from "react-dom/client";
import AOS from "aos";
import "aos/dist/aos.css";

import "./index.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Initialize AOS
AOS.init({
  duration: 700,
  easing: "ease-out-cubic",
  once: true,
  offset: 80,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);