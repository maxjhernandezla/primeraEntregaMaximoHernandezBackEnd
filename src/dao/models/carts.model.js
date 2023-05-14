import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: Array,
    default: [],
  },
  quantity: { type: Number, default: 0 },
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

export default cartModel;
