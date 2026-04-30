import "@shopify/shopify-api/adapters/node";
import { shopifyApi } from "@shopify/shopify-api";
import { MongoSessionStorage } from "../utils/mongoSessionStorage.js";

const appUrl = process.env.SHOPIFY_APP_URL || process.env.HOST;

if (!appUrl) {
  throw new Error("SHOPIFY_APP_URL or HOST is required");
}

const normalizedAppUrl = appUrl.replace(/\/$/, "");
const hostName = normalizedAppUrl.replace(/^https?:\/\//, "");
const hostScheme = normalizedAppUrl.startsWith("https://") ? "https" : "http";

export const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || "2026-04";

export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: (process.env.SHOPIFY_SCOPES || "read_products").split(","),
  hostName,
  hostScheme,
  apiVersion: SHOPIFY_API_VERSION,
  isEmbeddedApp: true,
  sessionStorage: new MongoSessionStorage()
});

export const appBaseUrl = normalizedAppUrl;
