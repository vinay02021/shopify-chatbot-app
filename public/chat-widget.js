(async function () {
  try {
    const shop = window.Shopify.shop;

    const BASE_URL = window.CHATBOT_APP_URL;

    const res = await fetch(
    `${BASE_URL}/api/public/settings?shop=${shop}`
    );

    const data = await res.json();

    if (!data.chatEnabled) return;

    // 🔥 create chat button
    const btn = document.createElement("div");
    btn.innerHTML = "💬";
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.width = "60px";
    btn.style.height = "60px";
    btn.style.background = "#000";
    btn.style.color = "#fff";
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    btn.style.borderRadius = "50%";
    btn.style.cursor = "pointer";
    btn.style.zIndex = "9999";

    document.body.appendChild(btn);

    // 🔥 chat box
    const chat = document.createElement("div");
    chat.style.position = "fixed";
    chat.style.bottom = "90px";
    chat.style.right = "20px";
    chat.style.width = "300px";
    chat.style.height = "400px";
    chat.style.background = "#fff";
    chat.style.border = "1px solid #ccc";
    chat.style.display = "none";
    chat.style.zIndex = "9999";

    chat.innerHTML = `
      <div style="background:#000;color:#fff;padding:10px">
        Chatbot
      </div>
      <div id="chat-body" style="padding:10px;height:300px;overflow:auto"></div>
      <input id="chat-input" placeholder="Type..." style="width:100%;padding:10px;border:none;border-top:1px solid #ccc"/>
    `;

    document.body.appendChild(chat);

    // 🔥 toggle open
    btn.onclick = () => {
      chat.style.display = chat.style.display === "none" ? "block" : "none";
    };

    // 🔥 simple FAQ response
    const input = chat.querySelector("#chat-input");
    const body = chat.querySelector("#chat-body");

    input.addEventListener("keypress", async (e) => {
      if (e.key === "Enter") {
        const msg = input.value;
        input.value = "";

        body.innerHTML += `<div><b>You:</b> ${msg}</div>`;

        // 🔥 call FAQ API
        const res = await fetch(
          `https://shopify-chatbot-app-8fyh.onrender.com/api/public/faq?q=${msg}&shop=${shop}`
        );

        const data = await res.json();

        body.innerHTML += `<div><b>Bot:</b> ${data.answer || "Sorry, I don't know"}</div>`;
      }
    });

  } catch (err) {
    console.error("Chat widget error:", err);
  }
})();