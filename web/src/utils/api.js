const BASE_URL = "https://shopify-chatbot-app-8fyh.onrender.com";

export const getFaqs = async () => {
  const res = await fetch(`${BASE_URL}/api/faq`);
  return res.json();
};

export const addFaq = async (data) => {
  const res = await fetch(`${BASE_URL}/api/faq`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteFaq = async (id) => {
  await fetch(`${BASE_URL}/api/faq/${id}`, {
    method: "DELETE",
  });
};