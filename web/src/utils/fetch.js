import { getSessionToken } from "@shopify/app-bridge-utils";

export const fetchWithAuth = async (url, options = {}) => {
  const token = await getSessionToken(window.app);

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
};