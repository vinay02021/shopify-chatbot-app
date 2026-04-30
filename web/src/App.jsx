import { useEffect, useState } from "react";
import { AppProvider, Frame } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import Dashboard from "./pages/Dashboard.jsx";
import { initializeAppBridge } from "./utils/appBridge.js";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initializeAppBridge();
    setIsReady(true);
  }, []);

  return (
    <AppProvider i18n={enTranslations}>
      <Frame>{isReady ? <Dashboard /> : null}</Frame>
    </AppProvider>
  );
}
