import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

// basic middleware
app.use(cors());
app.use(express.json());

// 🔥 BASIC ROUTE (TEST)
app.get("/", (req, res) => {
  res.send("Shopify App Backend Running ✅");
});

// 🔥 API TEST
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});