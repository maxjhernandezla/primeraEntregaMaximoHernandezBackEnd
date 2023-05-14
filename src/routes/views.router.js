import { Router } from "express";
import ProductManager from "../dao/managers/dbManagers/productsManager.js";

const productManager = new ProductManager("./src/dao/files/Products.json");
const router = Router();

router.get("/", async (req, res) => {
  const products = await productManager.getAll();
  res.render("index", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getAll();
  res.render("realTimeProducts", { products });
});

router.get("/messages", (req, res) => {
  res.render("messages");
});

export default router;
