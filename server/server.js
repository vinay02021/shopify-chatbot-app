import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

//IMPORTANT (Shopify + Render)
app.set("trust proxy", 1);

// middleware
app.use(cors());
app.use(express.json());

// AUTH ROUTES
app.use(authRoutes);


// ✅ BASIC ROUTE
app.get("/", (req, res) => {
  res.send("Shopify App Backend Running ✅");
});


// ✅ HEALTH CHECK
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});


// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});


// start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});