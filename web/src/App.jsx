import {
  AppProvider,
  Frame,
  Navigation,
  Page,
  Card,
} from "@shopify/polaris";

import {
  HomeIcon,
  QuestionCircleIcon,
} from "@shopify/polaris-icons";

import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";

export default function App() {
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
        <Page title="Dashboard">
          <Card sectioned>
            <p>🚀 Chatbot Dashboard Working</p>
          </Card>
        </Page>
      </Frame>
    </AppProvider>
  );
}