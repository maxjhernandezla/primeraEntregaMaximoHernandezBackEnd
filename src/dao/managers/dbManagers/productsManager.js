import productModel from "../../models/products.model.js";

export default class Products {
  constructor() {
    console.log("Working products whith DB");
  }

  getAll = async ({ limit, page, sort, category, status }) => {
    if (!limit) {
      limit = 10;
    }

    if (!page) {
      page = 1;
    }

    let options = { limit, page };

    if (sort) {
      options.sort = { price: sort };
    }

    let queryObject = {};

    if (category) {
      queryObject.category = category;
    }

    if (status) {
      queryObject.status = status;
    }

    const products = await productModel.paginate(queryObject, options);

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
