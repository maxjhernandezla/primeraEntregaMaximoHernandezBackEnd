import { PRODUCTS_DAO } from "../dao/index.js";

const getProducts = async (limit, page, sort, category, status) => {
  const products = await PRODUCTS_DAO.getAll(
    limit,
    page,
    sort,
    category,
    status
  );
  return products;
};

const getProductById = async (id) => {
  const product = await PRODUCTS_DAO.getById(id);
  return product;
};

const createProduct = async (product) => {
  const result = await PRODUCTS_DAO.create(product);
  return result;
};

const updateProduct = async (id, product) => {
    const result = await PRODUCTS_DAO.update(id, product)
    return result
}

export { getProducts, getProductById, createProduct, updateProduct };
