import {
  getCarts as getCartsService,
  getCartById as getCartByIdService,
  addToCart as addToCartService,
  createCart as createCartService,
  updateCart as updateCartService,
  updateQuantity as updateQuantityService,
  deleteProductInCart as deleteProductInCartService,
  deleteAllProductsInCart as deleteAllProductsInCartService,
  purchase as purchaseService,
} from "../services/carts.services.js";

const getCarts = async (req, res) => {
  try {
    const carts = await getCartsService();
    res.sendSuccess(carts);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await getCartByIdService(cid);
    res.sendSuccess(cart);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

const addToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await addToCartService(cid, pid);
    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
    console.log(error);
  }
};

const createCart = async (req, res) => {
  try {
    const { products } = req.body;
    const result = await createCartService(products);
    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products, quantity } = req.body;
    const result = await updateCartService(cid, { products, quantity });
    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const result = await updateQuantityService(cid, pid, quantity);
    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await deleteProductInCartService(cid, pid);
    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

const deleteAllProductsInCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await deleteAllProductsInCartService(cid);
    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

const purchase = async (req, res) => {
  try {
    const { cid } = req.params;
    const user = req.user;
    const result = await purchaseService(cid, user);
    res.sendSuccess(result);
  } catch (error) {
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
