import express from "express";
import axios from "axios";
import { shopify } from "../config/shopify.js";

export const authRoutes = express.Router();


// 🔥 START AUTH
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


// 🔥 CALLBACK (IMPORTANT PART)
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

    const shop = session.shop;
    const accessToken = session.accessToken;

    // 🔥 CHECK EXISTING SCRIPT
    const existing = await axios.get(
      `https://${shop}/admin/api/2024-01/script_tags.json`,
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
        },
      }
    );

    const alreadyAdded = existing.data.script_tags.find(tag =>
      tag.src.includes("chat-widget.js")
    );

    // 🔥 ADD SCRIPT IF NOT EXISTS
    if (!alreadyAdded) {
      await axios.post(
        `https://${shop}/admin/api/2024-01/script_tags.json`,
        {
          script_tag: {
            event: "onload",
            src: "https://shopify-chatbot-app-8fyh.onrender.com/chat-widget.js",
          },
        },
        {
          headers: {
            "X-Shopify-Access-Token": accessToken,
          },
        }
      );

      console.log("✅ Chat widget script added");
    } else {
      console.log("⚡ Script already exists");
    }

    // 👉 redirect back to app
    return res.redirect(`/?shop=${shop}`);

  } catch (error) {
    console.error("Auth Callback Error:", error);
    res.status(500).send("Auth failed");
  }
});