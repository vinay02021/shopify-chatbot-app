import express from "express";
import { Faq } from "../models/Faq.js";
import { verifyShopify } from "../middleware/verifyShopify.js";

export const faqRoutes = express.Router();

// 🔥 GET ALL FAQS (shop-wise)
faqRoutes.get("/", verifyShopify, async (req, res) => {
  try {
    const faqs = await Faq.find({ shop: req.shop }).sort({ createdAt: -1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch FAQs" });
  }
});

// 🔥 ADD FAQ
faqRoutes.post("/", verifyShopify, async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const faq = new Faq({
      question,
      answer,
      shop: req.shop, // 🔥 important
    });

    await faq.save();

    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: "Failed to add FAQ" });
  }
});

// 🔥 UPDATE FAQ (secure)
faqRoutes.put("/:id", verifyShopify, async (req, res) => {
  try {
    const { question, answer } = req.body;

    const updated = await Faq.findOneAndUpdate(
      { _id: req.params.id, shop: req.shop }, // 🔥 ownership check
      { question, answer },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update FAQ" });
  }
});

// 🔥 DELETE FAQ (secure)
faqRoutes.delete("/:id", verifyShopify, async (req, res) => {
  try {
    await Faq.findOneAndDelete({
      _id: req.params.id,
      shop: req.shop, // 🔥 ownership check
    });

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete FAQ" });
  }
});