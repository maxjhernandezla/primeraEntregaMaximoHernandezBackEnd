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
    this.get("/:cid", ["ADMIN", "USER"], passportStrategiesEnum.JWT, getCartById);
    this.post(
      "/:cid/products/:pid",
      ["USER", "ADMIN"],
      passportStrategiesEnum.JWT,
      addToCart
    );
    this.post("/", ["USER"], passportStrategiesEnum.JWT, createCart);
    this.put("/:cid", ["USER"], passportStrategiesEnum.JWT, updateCart);
    this.put(
      "/:cid/products/:pid",
      ["USER"],
      passportStrategiesEnum.JWT,
      updateQuantity
    );
    this.delete(
      "/:cid/products/:pid",
      ["USER", "ADMIN"],
      passportStrategiesEnum.JWT,
      deleteProductInCart
    );
    this.delete(
      "/:cid",
      ["USER", "ADMIN"],
      passportStrategiesEnum.JWT,
      deleteAllProductsInCart
    );
    this.post("/:cid/purchase", ["USER", "ADMIN"], passportStrategiesEnum.JWT, purchase);
  }
}
