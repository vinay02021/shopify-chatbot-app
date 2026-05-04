import express from "express";
import { ShopSetting } from "../models/ShopSetting.js";
import { Faq } from "../models/Faq.js";


export const publicRoutes = express.Router();

// 🔥 storefront ke liye (NO auth)
publicRoutes.get("/settings", async (req, res) => {
  const { shop } = req.query;

  if (!shop) return res.json({ chatEnabled: false });

  const setting = await ShopSetting.findOne({ shop });

  res.json({
    chatEnabled: setting?.chatEnabled || false,
  });
});


publicRoutes.get("/faq", async (req, res) => {
  const { q, shop } = req.query;

  if (!q || !shop) return res.json({ answer: "" });

  const faq = await Faq.findOne({
    shop,
    question: { $regex: q, $options: "i" },
  });

  res.json({
    answer: faq?.answer || null,
  });
});