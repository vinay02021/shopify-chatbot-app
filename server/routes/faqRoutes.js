import express from "express";
import { Faq } from "../models/Faq.js";

export const faqRoutes = express.Router();

// GET all FAQs
faqRoutes.get("/", async (req, res) => {
  const faqs = await Faq.find();
  res.json(faqs);
});

// ADD FAQ
faqRoutes.post("/", async (req, res) => {
  const { question, answer } = req.body;

  const faq = new Faq({ question, answer });
  await faq.save();

  res.json(faq);
});

// DELETE FAQ
faqRoutes.delete("/:id", async (req, res) => {
  await Faq.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});