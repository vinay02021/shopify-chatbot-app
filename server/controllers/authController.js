import { shopify } from "../config/shopify.js";
import { Shop } from "../models/Shop.js";
import { validateShopDomain } from "../utils/validateShop.js";

export async function beginAuth(req, res, next) {
  try {
    const shop = validateShopDomain(req.query.shop);

    if (!shop) {
      return res.status(400).send("A valid shop query parameter is required.");
    }

    await shopify.auth.begin({
      shop,
      callbackPath: "/auth/callback",
      isOnline: false,
      rawRequest: req,
      rawResponse: res
    });
  } catch (error) {
    next(error);
  }
}

export async function authCallback(req, res, next) {
  try {
    const { session } = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res
    });

    await Shop.findOneAndUpdate(
      { shop: session.shop },
      {
        shop: session.shop,
        accessToken: session.accessToken,
        scope: session.scope || ""
      },
      { upsert: true, new: true }
    );

    res.redirect(`/?shop=${encodeURIComponent(session.shop)}`);
  } catch (error) {
    next(error);
  }
}
