import Router from "./router.js";
import {
  products,
  getProductById,
  getCartById,
  login,
  resetPassword,
  register,
  recoverPassword,
  index,
  admin,
  purchase,
  logout, account
} from "../controllers/views.controller.js";
import { passportStrategiesEnum } from "../config/enums.config.js";

export default class ViewsRouter extends Router {
  init() {
    this.get("/login", ["PUBLIC"], passportStrategiesEnum.NOTHING, login);
    this.get("/register", ["PUBLIC"], passportStrategiesEnum.NOTHING, register);
    this.get("/products", ["PUBLIC"], passportStrategiesEnum.NOTHING, products);
    this.get(
      "/products/:pid",
      ["PUBLIC"],
      passportStrategiesEnum.NOTHING,
      getProductById
    );
    this.get(
      "/cart",
      ["USER", "ADMIN", "PREMIUM"],
      passportStrategiesEnum.JWT,
      getCartById
    );
    this.get(
      "/recoverpassword",
      ["PUBLIC"],
      passportStrategiesEnum.NOTHING,
      recoverPassword
    );
    this.get(
      "/resetpassword/:uid",
      ["PUBLIC"],
      passportStrategiesEnum.NOTHING,
      resetPassword
    );
    this.get("/", ["PUBLIC"], passportStrategiesEnum.NOTHING, index);
    this.get("/admin", ["ADMIN"], passportStrategiesEnum.JWT, admin);

    this.get(
      "/ticket/:tid",
      ["USER", "PREMIUM"],
      passportStrategiesEnum.JWT,
      purchase
    );
    this.get('/logout', ["PUBLIC"], passportStrategiesEnum.NOTHING, logout)
    this.get('/account', ["USER", "ADMIN", "PREMIUM"], passportStrategiesEnum.JWT, account)
  }

}

// router.get("/messages", (req, res) => {
//   res.render("messages");
// });
