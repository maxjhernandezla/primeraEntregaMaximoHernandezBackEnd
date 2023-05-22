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

    let options = { lean: true, limit, page };

    if (sort === "asc") {
      options.sort = { price: 1 };
    } else if (sort === "desc") {
      options.sort = { price: -1 };
    } else {
      options.sort = {};
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
    const productById = await productModel.findOne({ _id: pid }).lean();
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
