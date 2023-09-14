const addToCart = async (e) => {
  if (!e.target.classList.contains("addBtn")) {
    throw new Error("Admin users cannot add products to the cart.");
  }
  const pid = e.target.dataset.pid;
  const cartId = e.target.dataset.cartid;
  const role = e.target.dataset.role;
  console.log(e.target.dataset);
  if (role === 'admin') {
    return;
  }

  if (!cartId) {
    window.location.href = "/login";
    return;
  }

  try {
    await fetch(`/api/carts/${cartId}/products/${pid}`, { method: "POST" });

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Product added to cart!",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const products = document.querySelector(".generalContainer");
products.addEventListener("click", addToCart);

// const addToCart = async (e) => {
//   if (e.target.classList.contains("addBtn")) {
//     let pid  = e.target.dataset.pid;
//     let cartId  = e.target.dataset.cartid;
//     let role = e.target.dataset.role;
//     if(role !== 'admin') {
//       if(!cartId) {
//         window.location.href = "/login";
//       }
//       await fetch(
//         `/api/carts/${cartId}/products/${pid}`,
//         { method: "POST" }
//       );
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Product added to cart!",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//     }
//   }
// };