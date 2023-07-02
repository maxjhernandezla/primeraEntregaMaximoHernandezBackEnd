import Router from "./router.js";
import { passportStrategiesEnum } from "../config/enums.config.js";
import { login, register } from "../controllers/users.controller.js";

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
      async (req, res) => {
        const { email } = req.body;
        const result = await usersManager.getByEmail(email);
        res.sendSuccess(result);
      }
    );
    this.get(
      "/all",
      ["PUBLIC"],
      passportStrategiesEnum.NOTHING,
      async (req, res) => {
        const result = await usersManager.getAll();
        res.sendSuccess(result);
      }
    );
  }
}
