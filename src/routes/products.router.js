import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
import CartManager from "../managers/CartManager.js";

const router = Router();
const productManager = new ProductManager("./src/files/Products.json");
const cartManager = new CartManager('./src/files/Carts.json')

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  return res.send({ status: "success", products });
});

router.get("/:pid", async (req, res) => {
  const productId = Number(req.params.pid);
  const result = await productManager.getProductById(productId);
  if (!result) {
    return res.status(404).send({ error: "product not found" });
  }
  return res.send({ status: "success", result });
});

router.post("/", async (req, res) => {
  const product = req.body;

  if (!product.status) {
    product.status = true;
  }
  if (
    !product.title ||
    !product.description ||
    !product.code ||
    !product.stock ||
    !product.category
  ) {
    return res.status(400).send({ error: "Incomplete values." });
  }

  const result = await productManager.addProduct(product);
  return res.send({ status: "success", product });
});

router.put("/:pid", async (req, res) => {
  const newProductId = Number(req.params.pid);
  const newProduct = req.body;
  const result = await productManager.updateProduct(newProductId, newProduct);
  if (!result) {
    return res.status(404).send({ error: "product not found" });
  }
  return res.send({ status: "success", result });
});

router.delete("/:pid", async (req, res) => {
  const productId = Number(req.params.pid);
  const result = await productManager.deleteProduct(productId);
  if (!result) {
    return res.status(404).send({ error: "product not found" });
  }
  return res.send({ status: "success", messagge: "product deleted" });
});

export default router;
