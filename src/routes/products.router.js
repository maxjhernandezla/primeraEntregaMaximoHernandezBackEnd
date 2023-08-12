import Router from "./router.js";
import { passportStrategiesEnum } from "../config/enums.config.js";
//import toAsyncExpressDecorator from "async-express-decorator";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

export default class ProductsRouter extends Router {
  init() {
    this.get(
      "/",
      ["PUBLIC"],
      passportStrategiesEnum.NOTHING,
      getProducts
    );
    this.get(
      "/:pid",
      ["PUBLIC"],
      passportStrategiesEnum.NOTHING,
      getProductById
    );
    this.post("/", ["ADMIN"], passportStrategiesEnum.JWT, createProduct);
    this.put("/:pid", ["ADMIN"], passportStrategiesEnum.JWT, updateProduct);
    this.delete("/:pid", ["ADMIN"], passportStrategiesEnum.JWT, deleteProduct);
  }
}

// const router = toAsyncExpressDecorator(Router());

// router.get(
//   "/mockingproducts",
//   getMocksProducts
// );

// router.get(
//   "/",
//   getProducts
// );

// router.get(
//   "/:pid",
//   getProductById
// );

// router.post("/", createProduct);
// router.put("/:pid", updateProduct);
// router.delete("/:pid", deleteProduct);
//export default router;
