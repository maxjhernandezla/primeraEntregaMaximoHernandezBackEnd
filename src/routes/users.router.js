import Router from "./router.js";
import { passportStrategiesEnum } from "../config/enums.config.js";
import { getUserByEmail, login, register, getAllUsers } from "../controllers/users.controller.js";

export default class UsersRouter extends Router {
  init() {
    this.post("/login", ["PUBLIC"], passportStrategiesEnum.NOTHING, login);
    this.post(
      "/register",
      ["PUBLIC"],
      passportStrategiesEnum.NOTHING,
      register
    );
    this.get(
      "/",
      ["PUBLIC"],
      passportStrategiesEnum.NOTHING,
      getUserByEmail
    );
    this.get(
      "/all",
      ["PUBLIC"],
      passportStrategiesEnum.NOTHING,
      getAllUsers
    );
  }
}

