import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import express from "express";
import { appBaseUrl } from "./config/shopify.js";
import { connectDatabase } from "./config/database.js";
import { Shop } from "./models/Shop.js";
import { apiRoutes } from "./routes/apiRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { validateShopDomain } from "./utils/validateShop.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? appBaseUrl : true,
    credentials: true
  })
);

app.use(express.json());
app.use(authRoutes);
app.use("/api", apiRoutes);

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../web/dist");
  app.use(express.static(distPath));

  app.get("/", async (req, res, next) => {
    try {
      const shop = validateShopDomain(req.query.shop);

      if (!shop) {
        return res.status(400).send("Open this app from Shopify Admin.");
      }

      const installedShop = await Shop.findOne({ shop });

      if (!installedShop) {
        return res.redirect(`/auth?shop=${encodeURIComponent(shop)}`);
      }

      return res.sendFile(path.join(distPath, "index.html"));
    } catch (error) {
      return next(error);
    }
  });

  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  app.get("/", async (req, res) => {
    const shop = validateShopDomain(req.query.shop);

    if (!shop) {
      return res.status(400).send("Open this app from Shopify Admin.");
    }

    const installedShop = await Shop.findOne({ shop });

    if (!installedShop) {
      return res.redirect(`/auth?shop=${encodeURIComponent(shop)}`);
    }

    return res.sendFile(path.join(__dirname, "../web/index.html"));
  });
}

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "production" ? undefined : error.message
  });
});

await connectDatabase();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
