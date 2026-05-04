import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { connectDatabase } from "./config/database.js";
import { authRoutes } from "./routes/authRoutes.js";
import { faqRoutes } from "./routes/faqRoutes.js";
import { settingsRoutes } from "./routes/settingsRoutes.js";
import { publicRoutes } from "./routes/publicRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

// IMPORTANT (for Shopify)
app.set("trust proxy", 1);

// middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// 🔥 ===== CHAT WIDGET (ENV INJECTION) =====
app.get("/chat-widget.js", (req, res) => {
  try {
    const baseUrl = process.env.SHOPIFY_APP_URL;

    const filePath = path.join(process.cwd(), "public/chat-widget.js");
    const file = fs.readFileSync(filePath, "utf8");

    res.setHeader("Content-Type", "application/javascript");

    res.send(`
      window.CHATBOT_APP_URL = "${baseUrl}";
      ${file}
    `);
  } catch (err) {
    console.error("Widget error:", err);
    res.status(500).send("Widget load failed");
  }
});

// 🔥 API + AUTH ROUTES
app.use(authRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/public", publicRoutes);

// health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// PATH SETUP
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SERVE REACT BUILD
app.use(express.static(path.join(__dirname, "../web/dist")));

// ALL ROUTES → REACT
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../web/dist/index.html"));
});

// 🔥 START SERVER
const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error("Server start error:", error);
    process.exit(1);
  }
};

startServer();