import messageModel from "../../models/messages.model.js";
import mongoose from "mongoose";

export default class Message {
  constructor() {
    console.log("Working messages with DB");
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
