import { useEffect, useState } from "react";
import {
  Page,
  Card,
  Text,
  Button,
  InlineStack,
  Badge,
  Modal,
} from "@shopify/polaris";

import { fetchWithAuth } from "../utils/fetch";

const BASE_URL = "https://shopify-chatbot-app-8fyh.onrender.com";

export default function Dashboard() {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);

  // 🔥 load setting
  const loadSettings = async () => {
    const res = await fetchWithAuth(`${BASE_URL}/api/settings`);
    const data = await res.json();
    setEnabled(data.chatEnabled);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // 🔥 toggle
  const toggleChat = async () => {
    const res = await fetchWithAuth(`${BASE_URL}/api/settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatEnabled: !enabled }),
    });

    const data = await res.json();
    setEnabled(data.chatEnabled);
  };

  return (
    <Page title="Overview">
      
      <Card>
        <InlineStack align="space-between">

          <div>
            <Text variant="headingMd" as="h2">
              Online store chat
            </Text>

            <InlineStack gap="200">
              {enabled ? (
                <Badge tone="success">On</Badge>
              ) : (
                <Badge tone="critical">Off</Badge>
              )}
            </InlineStack>

            <Text as="p" tone="subdued">
              Manage store chat visibility, instant answers, and chatbot settings
            </Text>
          </div>

          <Button primary onClick={() => setOpen(true)}>
            Manage settings
          </Button>

        </InlineStack>
      </Card>

      {/* 🔥 SETTINGS MODAL */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Chat Settings"
        primaryAction={{
          content: enabled ? "Turn OFF Chat" : "Turn ON Chat",
          onAction: toggleChat,
        }}
        secondaryActions={[
          {
            content: "Close",
            onAction: () => setOpen(false),
          },
        ]}
      >
        <Modal.Section>
          <Text>
            Chat is currently <b>{enabled ? "ON" : "OFF"}</b>.
          </Text>
        </Modal.Section>
      </Modal>

    </Page>
  );
}