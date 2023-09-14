purchase = async (e) => {
  if (e.target.classList.contains("purchaseBtn")) {
    const cartId = e.target.dataset.cartid;
    let res = await fetch(
      `/api/carts/${cartId}/purchase`,
      { method: "POST" }
    );
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      window.location.href = `/ticket/${data.payload._id}`;
    } else {
      console.error('Error en la solicitud.');
    }    
  }
};

const purch = document.querySelector(".purchaseContainer");
purch.addEventListener("click", purchase);
