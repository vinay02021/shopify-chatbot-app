import { useEffect, useState } from "react";
import {
  Page,
  Card,
  TextField,
  Button,
  BlockStack,
  InlineStack,
} from "@shopify/polaris";

export default function Faq() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [editId, setEditId] = useState(null);

  // 🔥 LOAD FAQS FROM API
  const loadFaqs = async () => {
    const res = await fetch("/api/faq", {
      credentials: "include",
    });
    const data = await res.json();
    setFaqs(data);
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  // 🔥 ADD / UPDATE
  const handleSubmit = async () => {
    if (!question || !answer) return;

    if (editId) {
      // UPDATE
      await fetch(`/api/faq/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ question, answer }),
      });

      setEditId(null);
    } else {
      // ADD
      await fetch("/api/faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ question, answer }),
      });
    }

    setQuestion("");
    setAnswer("");
    loadFaqs();
  };

  // 🔥 DELETE
  const deleteFaq = async (id) => {
    await fetch(`/api/faq/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    loadFaqs();
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

          <Button primary onClick={handleSubmit}>
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
                  <Button onClick={() => editFaq(faq)}>
                    Edit
                  </Button>

                  <Button
                    tone="critical"
                    onClick={() => deleteFaq(faq._id)}
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