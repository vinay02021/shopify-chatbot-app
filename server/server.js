import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// AUTH ROUTES ADD
app.use(authRoutes);

// BASIC ROUTE
app.get("/", (req, res) => {
  res.send("Shopify App Backend Running ✅");
});

// API TEST
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});