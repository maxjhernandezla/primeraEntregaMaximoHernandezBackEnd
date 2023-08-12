import Router from "./router.js";
import {
  getProducts,
  getProductById,
  getCartById,
  login,
  reset,
  register,
} from "../controllers/views.controller.js";
import { passportStrategiesEnum } from "../config/enums.config.js";

export default class ViewsRouter extends Router {
  init() {
    this.get("/login", ["PUBLIC"], passportStrategiesEnum.NOTHING, login);
    this.get("/register", ["PUBLIC"], passportStrategiesEnum.NOTHING, register);
    this.get(
      "/products",
      ["PUBLIC"],
      passportStrategiesEnum.NOTHING,
      getProducts
    );
    this.get(
      "/products/:pid",
      ["PUBLIC"],
      passportStrategiesEnum.NOTHING,
      getProductById
    );
    this.get("/carts/:cid", ["USER", "ADMIN"], passportStrategiesEnum.JWT, getCartById);
    this.get("/reset", ["PUBLIC"], passportStrategiesEnum.NOTHING, reset);
  }
}

// router.get("/messages", (req, res) => {
//   res.render("messages");
// });
