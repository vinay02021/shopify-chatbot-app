export async function fetchShopDetails(shop) {
  const response = await fetch(`/api/shop?shop=${encodeURIComponent(shop)}`);
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error || "Shop details request failed.");
  }

  return payload;
}
