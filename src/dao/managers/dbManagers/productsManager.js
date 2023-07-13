import productModel from "../../models/products.model.js";

export default class Products {
  constructor() {
    console.log("Working products whith DB");
  }

  getAll = async (queryObject, options) => {
    const products = await productModel.paginate(queryObject, options);
    return products;
  };

  getById = async (pid) => {
    const productById = await productModel.findOne({ _id: pid }).lean();
    return productById;
  };

  create = async (product) => {
    const newProduct = await productModel.create(product);
    return newProduct;
  };

  update = async (id, product) => {
    const updatedProduct = await productModel.updateOne({ _id: id }, product);
    return updatedProduct;
  };

  delete = async (id) => {
    const deletedProduct = await productModel.deleteOne({ _id: id });
    return deletedProduct;
  };
}
