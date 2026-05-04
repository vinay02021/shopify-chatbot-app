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

    // 🔥 shop extract
    const shop = decoded.dest.replace("https://", "");

    req.shop = shop;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token error" });
  }
};