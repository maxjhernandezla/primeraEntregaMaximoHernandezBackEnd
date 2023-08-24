const form = document.getElementById("resetForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  const response = await fetch("/api/sessions/resetpassword", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const message = response.json()
  if (response.status === 200) {
    setTimeout(() => window.location.href = "/login", 500);
  } else if (message.error === "The token has expired, please generate a new one."){
    setTimeout(() => window.location.href = "/recoverpassword", 500);
  }
});
