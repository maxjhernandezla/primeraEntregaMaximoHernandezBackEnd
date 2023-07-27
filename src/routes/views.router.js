import { Router } from "express";
import { publicAccess, privateAccess } from "../middlewares/middlewares.js";
import {
  getProducts,
  getProductById,
  getCartById,
  login,
  reset,
  register,
} from "../controllers/views.controller.js";
const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/products", privateAccess, getProducts);

router.get("/products/:pid", privateAccess, getProductById);

router.get("/carts/:cid", privateAccess, getCartById);

router.get("/login", publicAccess, login);

router.get("/register", publicAccess);

router.get("/reset", publicAccess, reset);

export default router;

// router.get("/realtimeproducts", async (req, res) => {
//   const products = await productManager.getAll();
//   res.render("realTimeProducts", { products });
// });

// router.get("/messages", (req, res) => {
//   res.render("messages");
// });
