import { useEffect, useMemo, useState } from "react";
import {
  Banner,
  BlockStack,
  Box,
  Card,
  Layout,
  Page,
  SkeletonBodyText,
  Text
} from "@shopify/polaris";
import { getQueryParam } from "../utils/query.js";
import { fetchShopDetails } from "../utils/api.js";

export default function Dashboard() {
  const [shop, setShop] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const shopDomain = useMemo(() => getQueryParam("shop"), []);

  useEffect(() => {
    async function loadShop() {
      if (!shopDomain) {
        setError("Missing shop parameter. Open the app from Shopify Admin.");
        setLoading(false);
        return;
      }

      try {
        const shopDetails = await fetchShopDetails(shopDomain);
        setShop(shopDetails);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    loadShop();
  }, [shopDomain]);

  return (
    <Page title="Dashboard">
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            <Banner tone="success" title="App Installed Successfully">
              Your embedded Shopify app is connected to this store.
            </Banner>

            <Card>
              <Box padding="400">
                {loading ? (
                  <SkeletonBodyText lines={3} />
                ) : error ? (
                  <Banner tone="critical" title="Unable to load shop">
                    {error}
                  </Banner>
                ) : (
                  <BlockStack gap="300">
                    <Text as="h2" variant="headingMd">
                      Shop Info
                    </Text>
                    <Text as="p" variant="bodyMd">
                      <strong>Shop name:</strong> {shop.name}
                    </Text>
                    <Text as="p" variant="bodyMd">
                      <strong>Shop domain:</strong> {shop.myshopifyDomain}
                    </Text>
                    {shop.email ? (
                      <Text as="p" variant="bodyMd">
                        <strong>Email:</strong> {shop.email}
                      </Text>
                    ) : null}
                  </BlockStack>
                )}
              </Box>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
