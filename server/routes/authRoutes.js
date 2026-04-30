import express from "express";

export const authRoutes = express.Router();

// 🔹 START AUTH
authRoutes.get("/auth", (req, res) => {
  const { shop } = req.query;

  if (!shop) {
    return res.status(400).send("Missing shop parameter");
  }

  // 👉 simulate redirect to callback
  return res.redirect(`/auth/callback?shop=${shop}`);
});


// 🔹 CALLBACK (STEP 1 - TEST)
authRoutes.get("/auth/callback", (req, res) => {
  const { shop } = req.query;

  res.send(`✅ Auth flow working for ${shop}`);
});