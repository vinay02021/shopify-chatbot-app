import React from "react";
import { createRoot } from "react-dom/client";
import "@shopify/polaris/build/esm/styles.css";
import App from "./App.jsx";

import createApp from "@shopify/app-bridge";

const params = new URLSearchParams(window.location.search);

const host = params.get("host");

const app = createApp({
  apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
  host: host,
  forceRedirect: true,
});

// debug
window.app = app;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);