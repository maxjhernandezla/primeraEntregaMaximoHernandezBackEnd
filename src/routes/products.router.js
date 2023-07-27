import { Router } from "express";
import { passportStrategiesEnum } from "../config/enums.config.js";
import toAsyncExpressDecorator from "async-express-decorator";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMocksProducts,
} from "../controllers/products.controller.js";

const router = toAsyncExpressDecorator(Router());

router.get(
  "/mockingproducts",
  ["ADMIN"],
  passportStrategiesEnum.JWT,
  getMocksProducts
);

router.get(
  "/",
  ["PUBLIC", "USER", "ADMIN"],
  passportStrategiesEnum.NOTHING,
  getProducts
);

router.get(
  "/:pid",
  ["PUBLIC", "USER", "ADMIN"],
  passportStrategiesEnum.NOTHING,
  getProductById
);

router.post("/", ["ADMIN"], passportStrategiesEnum.JWT, createProduct);
router.put("/:pid", ["ADMIN"], passportStrategiesEnum.JWT, updateProduct);
router.delete("/:pid", ["ADMIN"], passportStrategiesEnum.JWT, deleteProduct);

export default router;

// export default class ProductsRouter extends Router {
//   init() {
//     this.get(
//       "/mockingproducts",
//       ["ADMIN"],
//       passportStrategiesEnum.JWT,
//       getMocksProducts
//     );
//     this.get(
//       "/",
//       ["PUBLIC", "USER", "ADMIN"],
//       passportStrategiesEnum.NOTHING,
//       getProducts
//     );
//     this.get(
//       "/:pid",
//       ["PUBLIC", "USER", "ADMIN"],
//       passportStrategiesEnum.NOTHING,
//       getProductById
//     );
//     this.post("/", ["ADMIN"], passportStrategiesEnum.JWT, createProduct);
//     this.put("/:pid", ["ADMIN"], passportStrategiesEnum.JWT, updateProduct);
//     this.delete("/:pid", ["ADMIN"], passportStrategiesEnum.JWT, deleteProduct);
//   }
//}
