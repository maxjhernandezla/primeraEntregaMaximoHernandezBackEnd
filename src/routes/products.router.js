import { Router } from "express";
import ProductManager from "../dao/managers/dbManagers/productsManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getAll();
    res.send({ status: "success", payload: products });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const result = await productManager.getById(pid);
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.status(500).send({ status: "error", error });
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const { title, description, price, image, category, stock, code, status } =
    req.body;
  if (!title || !description || !price || !category || !stock || !code) {
    return res.status(400).send({ status: "error", error: "Missing Data" });
  }

  try {
    const result = await productManager.create({
      title,
      description,
      price,
      image,
      category,
      stock,
      code,
      status,
    });
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
});

router.put("/:pid", async (req, res) => {
  const { title, description, price, image, category, stock, code, status } =
    req.body;
  const { pid } = req.params;
  console.log(pid);
  if (!title || !description || !price || !category || !stock || !code) {
    return res.status(400).send({ status: "error", error: "Missing Data" });
  }
  try {
    const result = await productManager.update(pid, {
      title,
      description,
      price,
      image,
      category,
      stock,
      code,
      status: true,
    });
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.status(500).send({ status: "error", error });
    console.log(error);
  }
});

export default router;

// import ProductManager from "../dao/managers/fileManagers/ProductManager.js";
// import CartManager from "../dao/managers/fileManagers/CartManager.js";

// const router = Router();
// const productManager = new ProductManager("./src/dao/files/Products.json");
// const cartManager = new CartManager("./src/dao/files/Carts.json");

// router.get("/", async (req, res) => {
//   const products = await productManager.getProducts();
//   return res.send({ status: "success", products });
// });

// router.get("/:pid", async (req, res) => {
//   const productId = Number(req.params.pid);
//   const result = await productManager.getProductById(productId);
//   if (!result) {
//     return res.status(404).send({ error: "product not found" });
//   }
//   return res.send({ status: "success", result });
// });

// router.post("/", async (req, res) => {
//   const product = req.body;

//   if (!product.status) {
//     product.status = true;
//   }
//   if (
//     !product.title ||
//     !product.description ||
//     !product.code ||
//     !product.stock ||
//     !product.category
//   ) {
//     return res.status(400).send({ error: "Incomplete values." });
//   }

//   const result = await productManager.addProduct(product);
//   return res.send({ status: "success", product });
// });

// router.put("/:pid", async (req, res) => {
//   const newProductId = Number(req.params.pid);
//   const newProduct = req.body;
//   const result = await productManager.updateProduct(newProductId, newProduct);
//   if (!result) {
//     return res.status(404).send({ error: "product not found" });
//   }
//   return res.send({ status: "success", result });
// });

// router.delete("/:pid", async (req, res) => {
//   const productId = Number(req.params.pid);
//   const result = await productManager.deleteProduct(productId);
//   if (!result) {
//     return res.status(404).send({ error: "product not found" });
//   }
//   return res.send({ status: "success", messagge: "product deleted" });
// });
