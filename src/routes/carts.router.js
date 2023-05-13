import { Router } from "express";
import ProductManager from "../dao/managers/fileManagers/ProductManager.js";
import CartManager from "../dao/managers/fileManagers/CartManager.js";

const router = Router();

const productManager = new ProductManager("./src/dao/files/Products.json");
const cartManager = new CartManager("./src/dao/files/Carts.json");

router.get("/", async (req, res) => {
  const result = await cartManager.getCarts();
  res.send({ status: "success", result });
});

router.post("/", async (req, res) => {
  const cart = await cartManager.addCart();
  res.send({ status: "succes", cart });
});

router.get("/:cid", async (req, res) => {
  const cartId = Number(req.params.cid);
  const products = await cartManager.getCartProductsById(cartId);

  if (!products) {
    return res.status(404).send({ error: "cart not found" });
  }

  res.send({ status: "succes", products });
});

router.post("/:cid/products/:pid", async (req, res) => {
  const cartId = Number(req.params.cid);
  const productId = Number(req.params.pid);
  const product = { id: productId };
  const cart = await cartManager.getCartById(cartId);
  const productExist = await productManager.getProductById(productId);
  if (!productExist) {
    return res.status(404).send({ error: "product not found" });
  }
  if (!cart) {
    return res.status(404).send({ error: "cart not found" });
  }
  const result = await cartManager.addProductInCart(cart, product);
  res.send({ status: "success", result });
});

// if (!productId) {
//   res.status(404).send({errer: 'product not found'})
// }

// router.post("/:cid/products/:pid", async (req, res) => {
//   const cartId = Number(req.params.cid);
//   const productId = Number(req.params.pid);
//   const quantity = req.body;
//   const product = {
//     id: productId,
//     ...quantity,
//   };
//   const cart = await cartManager.getCartById(cartId)
//   const productById = await productManager.getProductById(productId);
//   // if (!cart) {
//   //   return res.status(404).send({ error: "cart not found" });
//   // }
//   // if (!productById) {
//   //   return res.status(404).send({ error: "product not found" });
//   // }
//   // await cartManager.addProductInCart(cart, product)
//   console.log(product)
// });

export default router;
