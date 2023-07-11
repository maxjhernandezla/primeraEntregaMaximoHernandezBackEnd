import Router from "./router.js";
import { passportStrategiesEnum } from "../config/enums.config.js";
import {
  getCarts,
  getCartById,
  addToCart,
  createCart,
  updateCart,
  updateQuantity,
  deleteProductInCart,
  deleteAllProductsInCart,
} from "../controllers/carts.controller.js";

export default class CartsRouter extends Router {
  init() {
    this.get("/", ["ADMIN"], passportStrategiesEnum.JWT, getCarts);
    this.get("/:cid", ["ADMIN"], passportStrategiesEnum.JWT, getCartById);
    this.post(
      "/:cid/products/:pid",
      ["USER", "ADMIN"],
      passportStrategiesEnum.JWT,
      addToCart
    );
    this.post("/", ["USER", "ADMIN"], passportStrategiesEnum.JWT, createCart);
    this.put("/:cid", ["USER", "ADMIN"], passportStrategiesEnum.JWT, updateCart);
    this.put(
      "/:cid/products/:pid",
      ["USER", "ADMIN"],
      passportStrategiesEnum.JWT,
      updateQuantity
    );
    this.delete(
      "cid/products/:pid",
      ["USER", "ADMIN"],
      passportStrategiesEnum.JWT,
      deleteProductInCart
    );
    this.delete(
      "/:cid",
      ["USER", "ADMIN"],
      passportStrategiesEnum.JWT,
      deleteAllProductsInCart
    );
  }
}

//ANTES DE ROUTER COSTUM

// router.get("/", async (req, res) => {
//   try {
//     const carts = await cartManager.getAll();
//     res.send({ status: "success", payload: carts });
//   } catch (error) {
//     res.status(500).send({ status: "error", error });
//   }
// });

// router.get("/:cid", async (req, res) => {
//   const { cid } = req.params;
//   try {
//     const result = await cartManager.getById(cid);
//     res.send({ status: "success", payload: result });
//   } catch (error) {
//     res.status(500).send({ status: "error", error });
//   }
// });

// router.post("/:cid/products/:pid", async (req, res) => {
//   const { cid, pid } = req.params;
//   try {
//     const result = await cartManager.addProductToCart(cid, pid);
//     res.send({ status: "success", payload: result });
//   } catch (error) {
//     res.status(500).send({ status: "error", error: error.message });
//     console.log(error);
//   }
// });

// router.post("/", async (req, res) => {
//   const { products } = req.body;
//   try {
//     const result = await cartManager.create({ products });
//     res.send({ status: "succes", payload: result });
//   } catch (error) {
//     res.status(500).send({ status: "error", error });
//   }
// });

// router.put("/:cid", async (req, res) => {
//   const { cid } = req.params;
//   const { products, quantity } = req.body;
//   try {
//     const result = await cartManager.update(cid, { products, quantity });
//     res.send({ status: "succes", payload: result });
//   } catch (error) {
//     res.status(500).send({ status: "error", error });
//   }
// });

// router.put("/:cid/products/:pid", async (req, res) => {
//   const { cid, pid } = req.params;
//   const { quantity } = req.body;
//   try {
//     const result = await cartManager.updateQuantity(cid, pid, quantity);
//     res.send({ status: "succes", payload: result });
//   } catch (error) {
//     res.status(500).send({ status: "error", error });
//   }
// });

// router.delete("/:cid/products/:pid", async (req, res) => {
//   const { cid, pid } = req.params;
//   try {
//     const result = await cartManager.deleteProductInCart(cid, pid);
//     res.send({ status: "succes", payload: result });
//   } catch (error) {
//     res.status(500).send({ status: "error", error });
//   }
// });

// router.delete("/:cid", async (req, res) => {
//   const { cid } = req.params;
//   try {
//     const result = await cartManager.deleteAllProducts(cid);
//     res.send({ status: "succes", payload: result });
//   } catch (error) {
//     res.status(500).send({ status: "error", error });
//     console.log(error);
//   }
// });

// USANDO FILESYSTEM

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
