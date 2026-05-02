export const getFaqs = async () => {
  const res = await fetch(`/api/faq`);
  return res.json();
};

export const addFaq = async (data) => {
  const res = await fetch(`/api/faq`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const deleteFaq = async (id) => {
  await fetch(`/api/faq/${id}`, {
    method: "DELETE",
  });
};