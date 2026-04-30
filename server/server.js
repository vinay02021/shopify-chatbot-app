import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/authRoutes.js";
import { faqRoutes } from "./routes/faqRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔥 VERY IMPORTANT
app.use(authRoutes);
app.use("/api/faq", faqRoutes);

// test routes
app.get("/", (req, res) => {
  res.send("Shopify App Backend Running ✅");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


app.get("/dashboard", (req, res) => {
  res.send("🔥 Dashboard Working");
});