import { useState } from "react";
import {
  AppProvider,
  Frame,
  Navigation,
} from "@shopify/polaris";

import {
  HomeIcon,
  QuestionCircleIcon,
} from "@shopify/polaris-icons";

import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";

import Dashboard from "./pages/Dashboard";
import Faq from "./pages/Faq";

export default function App() {
  const [page, setPage] = useState("dashboard");

  const navigation = (
    <Navigation location={page}>
      <Navigation.Section
        items={[
          {
            label: "Dashboard",
            icon: HomeIcon,
            onClick: () => setPage("dashboard"),
          },
          {
            label: "FAQ Manager",
            icon: QuestionCircleIcon,
            onClick: () => setPage("faq"),
          },
        ]}
      />
    </Navigation>
  );

  return (
    <AppProvider i18n={enTranslations}>
      <Frame navigation={navigation}>
        {page === "dashboard" && <Dashboard />}
        {page === "faq" && <Faq />}
      </Frame>
    </AppProvider>
  );
}