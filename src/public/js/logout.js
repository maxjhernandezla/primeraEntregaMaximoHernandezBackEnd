logout = async (e) => {
    if (e.target.classList.contains("logoutBtn")) {
      let res = await fetch(
        `/api/sessions/logout`,
        { method: "GET" }
      );
      let message = await res;
      console.log(message);
      if (message.status === 200) {
        window.location.href = '/logout';
      }
    }
  };
  
  const logoutBtn = document.querySelector(".logoutContainer");
  logoutBtn.addEventListener("click", logout);