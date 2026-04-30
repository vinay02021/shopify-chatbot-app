import express from "express";

export const authRoutes = express.Router();

authRoutes.get("/auth", (req, res) => {
  const { shop } = req.query;

  if (!shop) {
    return res.status(400).send("Missing shop parameter");
  }

  // temporary auth simulation
  res.send(`Auth started for ${shop}`);
});