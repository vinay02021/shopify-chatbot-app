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

// 🔥 IMPORT PAGES
import Dashboard from "./pages/Dashboard";
import Faq from "./pages/Faq";

export default function App() {

  //  simple page switch (basic routing)
  const currentPage = "dashboard"; 

  const navigation = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          { label: "Dashboard", icon: HomeIcon },
          { label: "FAQ Manager", icon: QuestionCircleIcon },
        ]}
      />
    </Navigation>
  );

  return (
    <AppProvider i18n={enTranslations}>
      <Frame navigation={navigation}>
        
        {currentPage === "dashboard" && <Dashboard />}
        {currentPage === "faq" && <Faq />}

      </Frame>
    </AppProvider>
  );
}