import createApp from "@shopify/app-bridge";

let app = null;

export function initializeAppBridge() {
  if (typeof window === "undefined") {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const host = params.get("host");
  const apiKey = import.meta.env.VITE_SHOPIFY_API_KEY;

  if (!host || !apiKey) {
    return null;
  }

  if (!app) {
    app = createApp({
      apiKey,
      host,
      forceRedirect: true
    });
  }

  return app;
}

export function getAppBridge() {
  return app;
}
