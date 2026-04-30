export function validateShopDomain(shop) {
  if (!shop || typeof shop !== "string") {
    return null;
  }

  const normalizedShop = shop.trim().toLowerCase();
  const shopPattern = /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/;

  return shopPattern.test(normalizedShop) ? normalizedShop : null;
}
