import Router from "./router.js";
import { passportStrategiesEnum } from "../config/enums.config.js";
import { getLogs } from "../controllers/logger.controller.js";

export default class LoggerRouter extends Router {
  init() {
    this.get(
      "/loggerTest",
      ["PUBLIC"],
      passportStrategiesEnum.NOTHING,
      getLogs
    );
  }
}
