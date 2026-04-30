import { SHOPIFY_API_VERSION } from "../config/shopify.js";
import { Shop } from "../models/Shop.js";
import { validateShopDomain } from "../utils/validateShop.js";

const SHOP_INFO_QUERY = `
  query ShopInfo {
    shop {
      id
      name
      email
      myshopifyDomain
      primaryDomain {
        host
        url
      }
    }
  }
`;

export async function getShopDetails(req, res, next) {
  try {
    const shopDomain = validateShopDomain(req.query.shop);

    if (!shopDomain) {
      return res.status(400).json({ error: "A valid shop query parameter is required." });
    }

    const installedShop = await Shop.findOne({ shop: shopDomain });

    if (!installedShop) {
      return res.status(401).json({ error: "App is not installed for this shop." });
    }

    const response = await fetch(
      `https://${shopDomain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": installedShop.accessToken
        },
        body: JSON.stringify({ query: SHOP_INFO_QUERY })
      }
    );

    const payload = await response.json();

    if (!response.ok || payload.errors) {
      return res.status(response.status || 500).json({
        error: "Unable to fetch shop details from Shopify.",
        details: payload.errors || payload
      });
    }

    res.json(payload.data.shop);
  } catch (error) {
    next(error);
  }
}
