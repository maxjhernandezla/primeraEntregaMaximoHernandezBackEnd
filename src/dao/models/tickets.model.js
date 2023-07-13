import mongoose from "mongoose";

const ticketsCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    require: true,
  },
  purchase_datetime: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  purchaser: {
    type: String,
    require: true,
  },
});

const ticketsModel = mongoose.model(ticketsCollection, ticketSchema);

export default ticketsModel;
