import { Products } from "../dao/factory.js";
import { productEliminated } from "../mailing/mailing.js";
import ProductsRepository from "../repositories/products.repository.js";
import UsersRepository from "../repositories/users.repository.js";
import {
  IncompleteValues,
  ProductNotFound,
  CantDeleteProduct
} from "../utils/custom-exceptions.js";

const productsDAO = new Products();
const productsRepository = new ProductsRepository(productsDAO);

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
  if (!product) {
    throw new ProductNotFound("Product not found");
  }
  return product;
};

const createProduct = async (product, user) => {
  if (
    !product.title ||
    !product.description ||
    !product.price ||
    !product.category ||
    !product.stock ||
    !product.code
  ) {
    throw new IncompleteValues("Incomplete values");
  }
  if(!product.status) {
    product.status = true;
  }
  if (user.role === 'premium') product.owner = user.email;
  const result = await productsRepository.create(product);
  return result;
};

const updateProduct = async (id, product) => {
  const exists = await productsRepository.getById(id);
  if (!exists) {
    throw new ProductNotFound("Product not found");
  }
  if (
    !product.title ||
    !product.description ||
    !product.price ||
    !product.category ||
    product.stock === undefined ||
    !product.code
  ) {
    throw new IncompleteValues("Incomplete values");
  }
  const result = await productsRepository.update(id, product);
  return result;
};

const deleteProduct = async (id, user) => {
  const product = await productsRepository.getById(id);
  if (!product) {
    throw new ProductNotFound("Product not found");
  }
  if (user.role === "admin" || user.email === product.owner) {
    if(product.owner !== 'admin') {
      productEliminated(product.owner)
    }
    const result = await productsRepository.delete(id);
    return result;
  } else {
    throw new CantDeleteProduct('You do not have the authorization to delete this product');
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
