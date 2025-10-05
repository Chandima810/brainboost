import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // <-- Tailwind CSS is imported here

// Create root and render App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
