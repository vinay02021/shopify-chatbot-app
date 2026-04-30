import express from "express";

export const faqRoutes = express.Router();

// GET FAQs
faqRoutes.get("/", (req, res) => {
  res.json([
    { question: "Where is my order?", answer: "Track your order here." },
    { question: "Return policy?", answer: "You can return within 7 days." }
  ]);
});

// ADD FAQ
faqRoutes.post("/", (req, res) => {
  const { question, answer } = req.body;

  res.json({
    message: "FAQ added",
    data: { question, answer }
  });
});