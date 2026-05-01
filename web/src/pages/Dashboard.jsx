import { Page, Card, Text, Button, InlineStack, Badge } from "@shopify/polaris";

export default function Dashboard() {
  return (
    <Page title="Overview">
      
      <Card>
        <InlineStack align="space-between">
          
          <div>
            <Text variant="headingMd" as="h2">
              Online store chat
            </Text>

            <InlineStack gap="200" align="start">
              <Badge tone="success">On</Badge>
            </InlineStack>

            <Text as="p" tone="subdued">
              Manage store chat visibility, instant answers, and chatbot settings
            </Text>
          </div>

          <Button primary>
            Manage settings
          </Button>

        </InlineStack>
      </Card>

    </Page>
  );
}