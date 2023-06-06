import { Router } from "express";
import ProductManager from "../dao/managers/dbManagers/productsManager.js";
import CartManager from "../dao/managers/dbManagers/cartsManager.js";

const productManager = new ProductManager();
const cartManager = new CartManager();
const router = Router();

const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect('/products')
  next()
}

const privateAccess = (req, res, next) => {
  if (!req.session.user) return res.redirect('/login')
  next()
}

router.get('/', (req, res) => {
  res.render('index')
})

router.get("/products", privateAccess, async (req, res) => {
  const { limit, page, sort, category, status } = req.query;
  try {
    const { docs } = await productManager.getAll({
      limit,
      page,
      sort,
      category,
      status,
    });

    res.render("products", { products: docs, user: req.session.user });
  } catch (error) {
    res.status(500).send({ error: "error", error });
    console.log(error);
  }
});

router.get("/carts/:cid", privateAccess, async (req, res) => {
  const { cid } = req.params;
  try {
    const { products } = await cartManager.getById(cid);

    res.render("carts", { products });
  } catch (error) {
    res.status(500).send({ error: "error", error });
  }
});

router.get("/products/:pid", privateAccess,async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManager.getById(pid);
    res.render("product", { product });
  } catch (error) {
    res.status(500).send({ error: "error", error });
  }
});

router.get('/login', publicAccess, async (req, res) => {
  res.render('login')
})

router.get('/register', publicAccess, async (req, res) => {
  res.render('register')
})

router.get('/reset', publicAccess, async (req, res) => {
  res.render('reset')
})

export default router;




// router.get("/realtimeproducts", async (req, res) => {
//   const products = await productManager.getAll();
//   res.render("realTimeProducts", { products });
// });

// router.get("/messages", (req, res) => {
//   res.render("messages");
// });
