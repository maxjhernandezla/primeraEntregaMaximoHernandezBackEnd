import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  age: Number,
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "user",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
});
userSchema.pre(["find", "findOne"], function () {
  this.populate("cart");
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
