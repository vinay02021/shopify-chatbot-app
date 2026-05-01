import { Page, Card, Button } from "@shopify/polaris";

export default function Faq() {
  return (
    <Page title="FAQ Manager">
      <Card sectioned>
        <p>Manage chatbot FAQs</p>
        <Button primary>Add FAQ</Button>
      </Card>
    </Page>
  );
}