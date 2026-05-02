import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDatabase } from "./config/database.js";
import { authRoutes } from "./routes/authRoutes.js";
import { faqRoutes } from "./routes/faqRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

// IMPORTANT (for Shopify)
app.set("trust proxy", 1);

// middleware
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());

// API + AUTH ROUTES
app.use(authRoutes);
app.use("/api/faq", faqRoutes);

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

// 🔥 SAFE START FUNCTION
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