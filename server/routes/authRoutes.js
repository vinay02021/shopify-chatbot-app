import express from "express";
import { shopify } from "../config/shopify.js";

export const authRoutes = express.Router();


// 🔥 START AUTH (Shopify login)
authRoutes.get("/auth", async (req, res) => {
  try {
    const { shop } = req.query;

    if (!shop) {
      return res.status(400).send("Missing shop parameter");
    }

    return await shopify.auth.begin({
      shop,
      callbackPath: "/auth/callback",
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    });

  } catch (error) {
    console.error("Auth Begin Error:", error);
    res.status(500).send("Auth begin failed");
  }
});


// 🔥 CALLBACK (Shopify return)
authRoutes.get("/auth/callback", async (req, res) => {
  try {
    const callbackResponse = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const { session } = callbackResponse;

    if (!session) {
      return res.status(400).send("No session found");
    }

    // 👉 redirect back to app
    return res.redirect(`/?shop=${session.shop}`);

  } catch (error) {
    console.error("Auth Callback Error:", error);
    res.status(500).send("Auth failed");
  }
});