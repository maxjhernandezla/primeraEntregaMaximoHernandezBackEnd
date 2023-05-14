import cartModel from "../dao/models/carts.model.js";
import mongoose from "mongoose";
import { Router } from "express";
import CartManager from "../dao/managers/dbManagers/cartsManager.js";

const router = Router();

const cartManager = new CartManager();

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getAll();
    res.send({ status: "success", payload: carts });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const result = await cartManager.getById(cid);
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
});

router.post("/", async (req, res) => {
  const { products, quantity } = req.body;
  try {
    const result = await cartManager.create({ products, quantity });
    res.send({ status: "succes", payload: result });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
});

router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const { products, quantity } = req.body;
  try {
    const result = await cartManager.update(cid, { products, quantity });
    res.send({ status: "succes", payload: result });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
});

export default router;

// import { Router } from "express";
// import ProductManager from "../dao/managers/fileManagers/ProductManager.js";
// import CartManager from "../dao/managers/fileManagers/CartManager.js";

// const router = Router();

// const productManager = new ProductManager("./src/dao/files/Products.json");
// const cartManager = new CartManager("./src/dao/files/Carts.json");

// router.get("/", async (req, res) => {
//   const result = await cartManager.getCarts();
//   res.send({ status: "success", result });
// });

// router.post("/", async (req, res) => {
//   const cart = await cartManager.addCart();
//   res.send({ status: "succes", cart });
// });

// router.get("/:cid", async (req, res) => {
//   const cartId = Number(req.params.cid);
//   const products = await cartManager.getCartProductsById(cartId);

//   if (!products) {
//     return res.status(404).send({ error: "cart not found" });
//   }

//   res.send({ status: "succes", products });
// });

// router.post("/:cid/products/:pid", async (req, res) => {
//   const cartId = Number(req.params.cid);
//   const productId = Number(req.params.pid);
//   const product = { id: productId };
//   const cart = await cartManager.getCartById(cartId);
//   const productExist = await productManager.getProductById(productId);
//   if (!productExist) {
//     return res.status(404).send({ error: "product not found" });
//   }
//   if (!cart) {
//     return res.status(404).send({ error: "cart not found" });
//   }
//   const result = await cartManager.addProductInCart(cart, product);
//   res.send({ status: "success", result });
// });

// export default router;
