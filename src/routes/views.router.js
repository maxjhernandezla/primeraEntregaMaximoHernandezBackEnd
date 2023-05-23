import { Router } from "express";
import ProductManager from "../dao/managers/dbManagers/productsManager.js";
import CartManager from "../dao/managers/dbManagers/cartsManager.js";

const productManager = new ProductManager();
const cartManager = new CartManager();
const router = Router();

router.get('/', (req, res) => {
  
  res.render('index')
})


router.get("/products", async (req, res) => {
  const { limit, page, sort, category, status } = req.query;
  try {
    const { docs } = await productManager.getAll({
      limit,
      page,
      sort,
      category,
      status,
    });

    res.render("products", { products: docs });
  } catch (error) {
    res.status(500).send({ error: "error", error });
    console.log(error);
  }
});

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const { products } = await cartManager.getById(cid);

    res.render("carts", { products });
  } catch (error) {
    res.status(500).send({ error: "error", error });
  }
});

router.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManager.getById(pid);
    res.render("product", { product });
  } catch (error) {
    res.status(500).send({ error: "error", error });
  }
});

// router.get("/realtimeproducts", async (req, res) => {
//   const products = await productManager.getAll();
//   res.render("realTimeProducts", { products });
// });

// router.get("/messages", (req, res) => {
//   res.render("messages");
// });

export default router;
