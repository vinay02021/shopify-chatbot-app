import express from "express";

export const authRoutes = express.Router();

authRoutes.get("/auth", (req, res) => {
  const { shop } = req.query;

  if (!shop) {
    return res.status(400).send("Missing shop parameter");
  }

  return res.redirect(`/auth/callback?shop=${shop}`);
});

authRoutes.get("/auth/callback", (req, res) => {
  const { shop } = req.query;

  res.send(`✅ Auth flow working for ${shop}`);
});