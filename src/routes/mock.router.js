import Router from "./router.js";
import { passportStrategiesEnum } from "../config/enums.config.js";
import { getMocksProducts } from "../controllers/mock.controller.js";

export default class MockRouter extends Router {
  init() {
    this.get(
      "/mockingproducts",
      ["ADMIN"],
      passportStrategiesEnum.JWT,
      getMocksProducts
    );
  }
}
