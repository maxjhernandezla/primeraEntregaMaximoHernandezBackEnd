import mongoose from "mongoose";

const messageCollection = "messagges";

const messageSchema = new mongoose.Schema({
  user: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

const messageModel = mongoose.model(messageCollection, messageSchema);

export default messageModel;
