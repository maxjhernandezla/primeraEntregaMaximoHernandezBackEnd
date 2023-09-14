deleteFromCart = async (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    let pid = e.target.dataset.id;
    console.log(pid);
    let cid = e.target.dataset.cartid;
    let res = await fetch(
      `/api/carts/${cid}/products/${pid}`,
      { method: "DELETE" }
    );
    let message = await res;
    if (message.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product deleted from cart!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
};

const cart = document.querySelector(".cartContainer");
cart.addEventListener("click", deleteFromCart);
