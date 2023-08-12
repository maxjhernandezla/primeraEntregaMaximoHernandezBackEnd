import logger from "../../../middlewares/logger.js";
import messageModel from "../../models/messages.model.js";

export default class Message {
  constructor() {
    logger.info("Working messages with DB");
  }

  getAll = async () => {
    const messages = await messageModel.find().lean();
    return messages;
  };

  create = async (message) => {
    const newMessage = await messageModel.create(message);
    return newMessage;
  };
}
