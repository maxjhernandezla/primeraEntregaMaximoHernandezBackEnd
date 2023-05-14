import productModel from "../../models/products.model.js";

export default class Products {
  constructor() {
    console.log("Working products whith DB");
  }

  getAll = async () => {
    const products = await productModel.find().lean();
    return products;
  };

  getById = async (pid) => {
    const productById = await productModel.find({ _id: pid });
    return productById;
  };

  create = async (product) => {
    const newProduct = await productModel.create(product);
    return newProduct;
  };

  update = async (id, product) => {
    console.log(id);
    const updatedProduct = await productModel.updateOne({ _id: id }, product);
    return updatedProduct;
  };

  delete = async (id) => {
    const deletedProduct = await productModel.deleteOne({ _id: id });
    return deletedProduct;
  };
}
