import Router from "./router.js";
import { passportStrategiesEnum } from "../config/enums.config.js";
import {
  getUserByEmail,
  getAllUsers,
  premium,
  uploadDocuments,
  deleteOldUsers
} from "../controllers/users.controller.js";
import { uploader } from "../utils/utils.js";

export default class UsersRouter extends Router {
  init() {
    this.get("/", ["PUBLIC"], passportStrategiesEnum.NOTHING, getUserByEmail);
    this.get("/all", ["PUBLIC"], passportStrategiesEnum.NOTHING, getAllUsers);
    this.get(
      "/premium/:uid",
      ["USER", "PREMIUM"],
      passportStrategiesEnum.JWT,
      premium
    );
    this.post(
      "/:uid/documents",
      ["USER"], passportStrategiesEnum.JWT,
      uploader.any(),
      uploadDocuments
    );
    this.delete('/delete-old-users', ["ADMIN"], passportStrategiesEnum.JWT, deleteOldUsers)
  }
}
