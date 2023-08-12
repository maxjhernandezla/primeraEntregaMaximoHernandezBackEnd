import * as cartsService from "../services/carts.services.js";
import { CartNotFound, CartWithoutStock, ProductNotFound } from "../utils/custom-exceptions.js";

const getCarts = async (req, res) => {
  try {
    const carts = await cartsService.getCarts();
    res.sendSuccess(carts);
  } catch (error) {
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsService.getCartById(cid);
    res.sendSuccess(cart);
  } catch (error) {
    if (error instanceof CartNotFound) {
      return res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const addToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await cartsService.addToCart(cid, pid);
    res.sendSuccess(result);
  } catch (error) {
    if (error instanceof CartNotFound) {
      return res.sendClientError(error.message);
    }
    if (error instanceof ProductNotFound) {
      return res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const createCart = async (req, res) => {
  try {
    const { products } = req.body;
    const result = await cartsService.createCart(products);
    res.sendSuccess(result);
  } catch (error) {
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const result = await cartsService.updateCart(cid, products);
    res.sendSuccess(result);
  } catch (error) {
    if (error instanceof CartNotFound) {
      return res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const result = await cartsService.updateQuantity(cid, pid, quantity);
    res.sendSuccess(result);
  } catch (error) {
    if (error instanceof CartNotFound) {
      return res.sendClientError(error.message);
    }
    if (error instanceof ProductNotFound) {
      return res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await cartsService.deleteProductInCart(cid, pid);
    res.sendSuccess(result);
  } catch (error) {
    if (error instanceof CartNotFound) {
      return res.sendClientError(error.message);
    }
    if (error instanceof ProductNotFound) {
      return res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const deleteAllProductsInCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await cartsService.deleteAllProductsInCart(cid);
    res.sendSuccess(result);
  } catch (error) {
    if (error instanceof CartNotFound) {
      return res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const purchase = async (req, res) => {
  try {
    const { cid } = req.params;
    const user = req.user;
    const result = await cartsService.purchase(cid, user);
    res.sendSuccess(result);
  } catch (error) {
    if (error instanceof CartNotFound) {
      return res.sendClientError(error.message);
    }
    if (error instanceof CartWithoutStock) {
      return res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

export {
  getCarts,
  getCartById,
  addToCart,
  createCart,
  updateCart,
  updateQuantity,
  deleteProductInCart,
  deleteAllProductsInCart,
  purchase,
};
