import { CARTS_DAO } from "../dao/index.js";

export default class CartsRepository {
  getAll = async () => {
    return await CARTS_DAO.getAll();
  };

  getById = async (id) => {
    return await CARTS_DAO.getById(id);
  };

  create = async () => {
    return await CARTS_DAO.create();
  };

  update = async (id, cart) => {
    return await CARTS_DAO.update(id, cart);
  };

  updateQuantity = async (cart) => {
    return await CARTS_DAO.updateQuantity(cart);
  };

  addToCart = async (cid, cart) => {
    return await CARTS_DAO.addProductToCart(cid, cart);
  };

  deleteAllProducts = async (cart) => {
    return await CARTS_DAO.deleteAllProducts(cart);
  };

  deleteProductInCart = async (cart) => {
    return await CARTS_DAO.deleteProductInCart(cart);
  };
}
