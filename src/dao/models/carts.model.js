import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          require: true,
          default: 1
        },
      },
    ],
    default: [],
    require: true,
  },
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "users",
  // },
});

cartSchema.pre(["find", "findOne"], function () {
  this.populate("products.product");
});
// cartSchema.pre(["find", "findOne"], function () {
//   this.populate("userId");
// });

const cartModel = mongoose.model(cartsCollection, cartSchema);

export default cartModel;
