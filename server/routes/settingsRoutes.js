import express from "express";
import { verifyShopify } from "../middleware/verifyShopify.js";
import { ShopSetting } from "../models/ShopSetting.js";

export const settingsRoutes = express.Router();

// 🔹 GET settings
settingsRoutes.get("/", verifyShopify, async (req, res) => {
  let setting = await ShopSetting.findOne({ shop: req.shop });

  if (!setting) {
    setting = await ShopSetting.create({ shop: req.shop });
  }

  res.json(setting);
});

// 🔹 UPDATE toggle
settingsRoutes.post("/", verifyShopify, async (req, res) => {
  const { chatEnabled } = req.body;

  const setting = await ShopSetting.findOneAndUpdate(
    { shop: req.shop },
    { chatEnabled },
    { new: true, upsert: true }
  );

  res.json(setting);
});