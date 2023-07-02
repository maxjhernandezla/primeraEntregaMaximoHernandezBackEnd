import Router from "./router.js";
import ProductManager from "../dao/managers/dbManagers/productsManager.js";
import { passportStrategiesEnum } from "../config/enums.config.js";

const productManager = new ProductManager();

export default class ProductsRouter extends Router {
  init() {
    this.get(
      "/",
      ["PUBLIC", "USER", "ADMIN"],
      passportStrategiesEnum.NOTHING,
      this.getAll
    );
    this.get(
      "/:pid",
      ["PUBLIC", "USER", "ADMIN"],
      passportStrategiesEnum.NOTHING,
      this.getProductById
    );
    this.post("/", ["ADMIN"], passportStrategiesEnum.JWT, this.createProduct);
    this.put(
      "/:cid",
      ["ADMIN"],
      passportStrategiesEnum.JWT,
      this.updateProduct
    );
  }

  async getAll(req, res) {
    const { limit, page, sort, category, status } = req.query;
    try {
      const products = await productManager.getAll({
        limit,
        page,
        sort,
        category,
        status,
      });
      res.sendSuccess(products);
    } catch (error) {
      res.sendServerError(error.message);
    }
  }
  async getProductById(req, res) {
    try {
      const { pid } = req.params;
      const result = await productManager.getById(pid);
      res.sendSuccess(result);
    } catch (error) {
      res.sendServerError(error.message);
    }
  }

  async createProduct(req, res) {
    try {
      const {
        title,
        description,
        price,
        image,
        category,
        stock,
        code,
        status,
      } = req.body;
      if (!title || !description || !price || !category || !stock || !code) {
        return res.status(400).sendClientError("incomplete values");
      }
      const result = await productManager.create({ ...req.body });
      res.sendSuccess(result);
    } catch (error) {
      res.sendServerError(error.message);
    }
  }

  async updateProduct(req, res) {
    try {
      const {
        title,
        description,
        price,
        image,
        category,
        stock,
        code,
        status,
      } = req.body;
      const { pid } = req.params;
      if (!title || !description || !price || !category || !stock || !code) {
        return res.status(400).sendClientError("incomplete values");
      }
      const result = await productManager.update(pid, {...req.body})
      res.sendSuccess(result)
    } catch (error) {
      res.sendServerError(error.message)
    }
  }
}

// router.get("/", async (req, res) => {
//   const { limit, page, sort, category, status } = req.query;
//   try {
//     const products = await productManager.getAll({
//       limit,
//       page,
//       sort,
//       category,
//       status,
//     });
//     res.send({ status: "success", payload: products });
//   } catch (error) {
//     res.status(500).send({ status: "error", error });
//     console.log(error);
//   }
// });

// router.get("/:pid", async (req, res) => {
//   const { pid } = req.params;
//   try {
//     const result = await productManager.getById(pid);
//     res.send({ status: "success", payload: result });
//   } catch (error) {
//     res.status(500).send({ status: "error", error });
//     console.log(error);
//   }
// });

// router.post("/", async (req, res) => {
//   const { title, description, price, image, category, stock, code, status } =
//     req.body;
//   if (!title || !description || !price || !category || !stock || !code) {
//     return res.status(400).send({ status: "error", error: "Missing Data" });
//   }

//   try {
//     const result = await productManager.create({
//       title,
//       description,
//       price,
//       image,
//       category,
//       stock,
//       code,
//       status,
//     });
//     res.send({ status: "success", payload: result });
//   } catch (error) {
//     res.status(500).send({ status: "error", error });
//   }
// });

// router.put("/:pid", async (req, res) => {
//   const { title, description, price, image, category, stock, code, status } =
//     req.body;
//   const { pid } = req.params;
//   console.log(pid);
//   if (!title || !description || !price || !category || !stock || !code) {
//     return res.status(400).send({ status: "error", error: "Missing Data" });
//   }
//   try {
//     const result = await productManager.update(pid, {
//       title,
//       description,
//       price,
//       image,
//       category,
//       stock,
//       code,
//       status: true,
//     });
//     res.send({ status: "success", payload: result });
//   } catch (error) {
//     res.status(500).send({ status: "error", error });
//     console.log(error);
//   }
// });

//PREMONGO
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
