import express from "express";
import cors from "cors";
import path from "path";
import { authRoutes } from "./routes/authRoutes.js";
import { faqRoutes } from "./routes/faqRoutes.js";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔥 VERY IMPORTANT
app.use(authRoutes);
app.use("/api/faq", faqRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/dashboard.html"));
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