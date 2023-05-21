import { Router } from "express";
import ProductManager from "../dao/managers/dbManagers/productsManager.js";

const productManager = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
  const { limit, page, sort, category, status } = req.query;
  try {
    const { docs } = await productManager.getAll({
      limit,
      page,
      sort,
      category,
      status,
    });

    res.render("index", { products: docs });
  } catch (error) {
    res.status(500).send({ error: "error", error });
    console.log(error);
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
