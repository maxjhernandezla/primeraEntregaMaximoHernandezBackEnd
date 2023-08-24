import Router from "./router.js";
import { passportStrategiesEnum } from "../config/enums.config.js";
import { getUserByEmail, getAllUsers } from "../controllers/users.controller.js";

export default class UsersRouter extends Router {
  init() {
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

