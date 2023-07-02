import { CARTS_DAO } from "../dao/index.js";

const getCarts = async () => {
  const carts = await CARTS_DAO.getAll();
  return carts;
};

const getCartById = async (cid) => {
  const cart = await CARTS_DAO.getById(cid);
  return cart;
};

const addToCart = async (cid, pid) => {
  const result = await CARTS_DAO.addProductToCart(cid, pid);
  return result;
};

const createCart = async (products = []) => {
  const result = await CARTS_DAO.create(products);
  return result;
};

const updateCart = async (cid, cart) => {
  const result = await CARTS_DAO.update(cid, cart);
  return result;
};

const updateQuantity = async (cid, pid, quantity) => {
  const result = await CARTS_DAO.updateQuantity(cid, pid, quantity);
  return result;
};

const deleteProductInCart = async (cid, pid) => {
  const result = await CARTS_DAO.deleteProductInCart(cid, pid);
  return result;
};

const deleteAllProductsInCart = async (cid) => {
    const result = await CARTS_DAO.deleteProductInCart(cid)
    return result
}

export {
  getCarts,
  getCartById,
  addToCart,
  createCart,
  updateCart,
  updateQuantity,
  deleteProductInCart,
  deleteAllProductsInCart
};
