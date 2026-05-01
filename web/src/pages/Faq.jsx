import { useState } from "react";
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

  // 🔥 Add / Update FAQ
  const handleSubmit = () => {
    if (!question || !answer) return;

    if (editId) {
      // update
      const updated = faqs.map((f) =>
        f.id === editId ? { ...f, question, answer } : f
      );
      setFaqs(updated);
      setEditId(null);
    } else {
      // add
      const newFaq = {
        id: Date.now(),
        question,
        answer,
      };
      setFaqs([newFaq, ...faqs]);
    }

    setQuestion("");
    setAnswer("");
  };

  // 🔥 Delete
  const deleteFaq = (id) => {
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  // 🔥 Edit
  const editFaq = (faq) => {
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setEditId(faq.id);
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
            <Card key={faq.id} sectioned>
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
                    onClick={() => deleteFaq(faq.id)}
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