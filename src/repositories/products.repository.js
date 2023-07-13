import { PRODUCTS_DAO } from "../dao/index.js";

export default class ProductsRepository {
  getAll = async (queryObject, options) => {
    return await PRODUCTS_DAO.getAll(queryObject, options);
  };

  getById = async (id) => {
    return await PRODUCTS_DAO.getById(id);
  };

  create = async (product) => {
    return await PRODUCTS_DAO.create(product);
  };
  update = async (id, product) => {
    return await PRODUCTS_DAO.update(id, product);
  };

  delete = async (id) => {
    return await PRODUCTS_DAO.delete(id);
  };
}
