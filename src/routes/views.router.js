import { Router } from "express";
import ProductManager from "../dao/managers/fileManagers/ProductManager.js";

const productManager = new ProductManager("./src/dao/files/Products.json");
const router = Router();

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("index", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", { products });
});

export default router;
