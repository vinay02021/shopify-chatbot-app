import React from "react";
import { createRoot } from "react-dom/client";
import "@shopify/polaris/build/esm/styles.css";
import App from "./App.jsx";

import createApp from "@shopify/app-bridge";

const params = new URLSearchParams(window.location.search);
const host = params.get("host");

console.log("HOST:", host);

if (!host) {
  console.error("❌ No host param — Shopify embed broken");
}

const app = host
  ? createApp({
      apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
      host,
    })
  : null;

window.app = app;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);