import Router from "./router.js";
import { passportStrategiesEnum } from "../config/enums.config.js";
import * as ticketController from "../controllers/tickets.controller.js";

export default class TicketRouter extends Router {
  init() {
    this.get(
      "/:tid",
      ["USER", "PREMIUM"],
      passportStrategiesEnum.JWT,
      ticketController.getTicketById
    );
  }
}
