import { useEffect, useState } from "react";
import {
  Page,
  Card,
  TextField,
  Button,
  BlockStack,
  InlineStack,
} from "@shopify/polaris";

import { fetchWithAuth } from "../utils/fetch";

const BASE_URL = "https://shopify-chatbot-app-8fyh.onrender.com";

export default function Faq() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [editId, setEditId] = useState(null);

  // 🔥 LOAD FAQS
  const loadFaqs = async () => {
    try {
      const res = await fetchWithAuth(`${BASE_URL}/api/faq`);
      const data = await res.json();
      setFaqs(data);
    } catch (err) {
      console.error("❌ Load FAQ error:", err);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  // 🔥 ADD / UPDATE
  const handleSubmit = async () => {
    if (!question || !answer) return;

    try {
      if (editId) {
        // UPDATE
        await fetchWithAuth(`${BASE_URL}/api/faq/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question, answer }),
        });

        setEditId(null);
      } else {
        // ADD
        await fetchWithAuth(`${BASE_URL}/api/faq`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question, answer }),
        });
      }

      setQuestion("");
      setAnswer("");
      loadFaqs();
    } catch (err) {
      console.error("❌ Submit error:", err);
    }
  };

  // 🔥 DELETE
  const deleteFaq = async (id) => {
    try {
      await fetchWithAuth(`${BASE_URL}/api/faq/${id}`, {
        method: "DELETE",
      });

      loadFaqs();
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  };

  // 🔥 EDIT
  const editFaq = (faq) => {
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setEditId(faq._id);
  };

  return (
    <Page title="FAQ Manager">

      {/* FORM */}
      <Card title={editId ? "Edit FAQ" : "Add FAQ"} sectioned>
        <BlockStack gap="300">
          <TextField
            label="Question"
            value={question}
            onChange={setQuestion}
          />

          <TextField
            label="Answer"
            value={answer}
            onChange={setAnswer}
            multiline={3}
          />

          <Button primary onClick={handleSubmit} type="button">
            {editId ? "Update FAQ" : "Add FAQ"}
          </Button>
        </BlockStack>
      </Card>

      {/* LIST */}
      <Card title="FAQ List" sectioned>
        {faqs.length === 0 && <p>No FAQs yet</p>}

        <BlockStack gap="300">
          {faqs.map((faq) => (
            <Card key={faq._id} sectioned>
              <InlineStack align="space-between">
                <div>
                  <p><strong>Q:</strong> {faq.question}</p>
                  <p><strong>A:</strong> {faq.answer}</p>
                </div>

                <InlineStack gap="200">
                  <Button onClick={() => editFaq(faq)} type="button">
                    Edit
                  </Button>

                  <Button
                    tone="critical"
                    onClick={() => deleteFaq(faq._id)}
                    type="button"
                  >
                    Delete
                  </Button>
                </InlineStack>
              </InlineStack>
            </Card>
          ))}
        </BlockStack>
      </Card>

    </Page>
  );
}