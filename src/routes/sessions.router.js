import Router from "./router.js";
import { passportStrategiesEnum } from "../config/enums.config.js";
import {
  logged,
  recoverPassword,
  resetPassword,
  login,
  register,
  logout,
} from "../controllers/sessions.controller.js";

export default class SessionsRouter extends Router {
  init() {
    this.get(
      "/current",
      ["USER", "PREMIUM", "ADMIN"],
      passportStrategiesEnum.JWT,
      logged
    );
    this.get(
      "/logout",
      ["USER", "ADMIN", "PREMIUM"],
      passportStrategiesEnum.JWT,
      logout
    );
    this.post(
      "/recoverpassword",
      ["PUBLIC"],
      passportStrategiesEnum.NOTHING,
      recoverPassword
    );
    this.post(
      "/resetpassword",
      ["PUBLIC"],
      passportStrategiesEnum.NOTHING,
      resetPassword
    );
    this.post("/login", ["PUBLIC"], passportStrategiesEnum.NOTHING, login);
    this.post(
      "/register",
      ["PUBLIC"],
      passportStrategiesEnum.NOTHING,
      register
    );
  }
}
