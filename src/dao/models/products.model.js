import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  brand: {
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
  image: {
    type: Array,
    default: []
  },
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
  owner: {
    type: String,
    require: true,
    default: 'admin'
  }
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productsCollection, productSchema);

export default productModel;
