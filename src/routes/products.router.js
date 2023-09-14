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
    this.post("/", ["ADMIN", "PREMIUM"], passportStrategiesEnum.JWT, createProduct);
    this.put("/:pid", ["ADMIN", "PREMIUM"], passportStrategiesEnum.JWT, updateProduct);
    this.delete("/:pid", ["ADMIN", "PREMIUM"], passportStrategiesEnum.JWT, deleteProduct);
  }
}
