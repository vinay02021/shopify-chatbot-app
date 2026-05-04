import jwt from "jsonwebtoken";

export const verifyShopify = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ error: "No token" });
  }

  const token = auth.replace("Bearer ", "");

  try {
    const decoded = jwt.decode(token);

    if (!decoded || !decoded.dest) {
      return res.status(401).json({ error: "Invalid token" });
    }

    let shop = decoded.dest.replace("https://", "");

    // 🔥 IMPORTANT FIX
    if (shop.includes("admin.shopify.com/store/")) {
      const name = shop.split("/store/")[1];
      shop = `${name}.myshopify.com`;
    }

    console.log("✅ FINAL SHOP:", shop); // debug

    req.shop = shop;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token error" });
  }
};