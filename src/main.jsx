import React from "react";
import ReactDOM from "react-dom/client";

// Font loaded via Google Fonts CDN in index.html
import "./index.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);