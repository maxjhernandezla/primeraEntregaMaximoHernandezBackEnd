import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  image: String,
  category: {
    type: String,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  code: {
    type: String,
    unique: true,
  },
  status: Boolean,
});
const productModel = mongoose.model(productsCollection, productSchema);

export default productModel;
