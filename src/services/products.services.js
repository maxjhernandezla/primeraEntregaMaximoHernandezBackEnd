import { PRODUCTS_DAO } from "../dao/index.js";
import ProductsRepository from "../repositories/products.repository.js";

const productsRepository = new ProductsRepository();

const getProducts = async ({ limit, page, sort, category, status }) => {
  if (!limit) {
    limit = 10;
  }
  if (!page) {
    page = 1;
  }

  let options = { lean: true, limit, page };

  let queryObject = {};

  if (sort === "asc") {
    options.sort = { price: 1 };
  } else if (sort === "desc") {
    options.sort = { price: -1 };
  } else {
    options.sort = {};
  }

  if (category) {
    queryObject.category = category;
  }

  if (status) {
    queryObject.status = status;
  }
  const products = await productsRepository.getAll(queryObject, options);
  return products;
};

const getProductById = async (id) => {
  const product = await productsRepository.getById(id);
  return product;
};

const createProduct = async (product) => {
  const result = await productsRepository.create(product);
  return result;
};

const updateProduct = async (id, product) => {
  const result = await productsRepository.update(id, product);
  return result;
};

const deleteProduct = async (id) => {
  const result = await productsRepository.delete(id);
  return result;
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
