import express from "express";
import { Faq } from "../models/Faq.js";

export const faqRoutes = express.Router();

// 🔥 GET ALL FAQS
faqRoutes.get("/", async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch FAQs" });
  }
});

// 🔥 ADD FAQ
faqRoutes.post("/", async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const faq = new Faq({ question, answer });
    await faq.save();

    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: "Failed to add FAQ" });
  }
});

// 🔥 UPDATE FAQ
faqRoutes.put("/:id", async (req, res) => {
  try {
    const { question, answer } = req.body;

    const updated = await Faq.findByIdAndUpdate(
      req.params.id,
      { question, answer },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update FAQ" });
  }
});

// 🔥 DELETE FAQ
faqRoutes.delete("/:id", async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete FAQ" });
  }
});