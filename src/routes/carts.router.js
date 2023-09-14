import Router from "./router.js";
import { passportStrategiesEnum } from "../config/enums.config.js";
import {
  getCarts,
  getCartById,
  addToCart,
  createCart,
  updateCart,
  updateQuantity,
  deleteProductInCart,
  deleteAllProductsInCart,
  purchase,
} from "../controllers/carts.controller.js";

export default class CartsRouter extends Router {
  init() {
    this.get("/", ["ADMIN"], passportStrategiesEnum.JWT, getCarts);
    this.get("/:cid", ["ADMIN", "USER", "PREMIUM"], passportStrategiesEnum.JWT, getCartById);
    this.post(
      "/:cid/products/:pid",
      ["USER", "ADMIN", "PREMIUM"],
      passportStrategiesEnum.JWT,
      addToCart
    );
    this.post("/", ["USER", "PREMIUM"], passportStrategiesEnum.JWT, createCart);
    this.put("/:cid", ["USER", "PREMIUM"], passportStrategiesEnum.JWT, updateCart);
    this.put(
      "/:cid/products/:pid",
      ["USER", "PREMIUM"],
      passportStrategiesEnum.JWT,
      updateQuantity
    );
    this.delete(
      "/:cid/products/:pid",
      ["USER", "ADMIN", "PREMIUM"],
      passportStrategiesEnum.JWT,
      deleteProductInCart
    );
    this.delete(
      "/:cid",
      ["USER", "ADMIN", "PREMIUM"],
      passportStrategiesEnum.JWT,
      deleteAllProductsInCart
    );
    this.post("/:cid/purchase", ["USER", "ADMIN", "PREMIUM"], passportStrategiesEnum.JWT, purchase);
  }
}
