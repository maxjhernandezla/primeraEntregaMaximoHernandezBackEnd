const addToCart = async (e) => {
  if (e.target.classList.contains("addBtn")) {
    let pid = e.target.dataset.id;
    let res = await fetch(
      `/api/carts/6468f3396c3a9260d3ef7a49/products/${pid}`,
      { method: "POST" }
    );
    let message = await res.json();
    if (message.status === "success") {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product added to cart!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
};
const products = document.querySelector(".generalContainer");
products.addEventListener("click", addToCart);
