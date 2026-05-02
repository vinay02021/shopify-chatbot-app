const BASE_URL = window.location.origin;

export const getFaqs = async () => {
  const res = await fetch(`${BASE_URL}/api/faq`, {
    credentials: "include",
  });
  return res.json();
};

export const addFaq = async (data) => {
  const res = await fetch(`${BASE_URL}/api/faq`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteFaq = async (id) => {
  await fetch(`${BASE_URL}/api/faq/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};