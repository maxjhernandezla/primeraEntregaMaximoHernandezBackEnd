import { CARTS_DAO, PRODUCTS_DAO } from "../dao/index.js";
import { createTicket as createTicketService } from "./tickets.service.js";
import CartsRepository from "../repositories/carts.repository.js";
import * as productsService from './products.services.js'
import { CartNotFound, CartWithoutStock, ProductNotFound } from "../utils/custom-exceptions.js";
import { Carts } from "../dao/factory.js";

const cartsDAO = new Carts()
const cartsRepository = new CartsRepository(cartsDAO);

const getCarts = async () => {
  const carts = await cartsRepository.getAll();
  return carts;
};

const getCartById = async (cid) => {
  const cart = await cartsRepository.getById(cid);
  if (!cart) {
    throw new CartNotFound('Cart not found')
  }
  return cart;
};

const createCart = async () => {
  const result = await cartsRepository.create();
  return result;
};

const updateCart = async (cid, cart) => {
  const exists = await getCartById(cid)
  if (!exists) {
    throw new CartNotFound('Cart not found')
  }
  const result = await CARTS_DAO.update(cid, cart);
  return result;
};

const addToCart = async (cid, pid) => {
  const cart = await getCartById(cid);
  if (!cart) {
    throw new CartNotFound('Cart not found')
  }
  const product = await productsService.getProductById(pid);
  const productInCart = cart.products.findIndex(
    (p) => p.product._id.toString() === pid.toString()
  );
  if (productInCart === -1) {
    cart.products.push({
      product: product._id,
    });
  } else {
    cart.products[productInCart].quantity++;
  }
  const result = await cartsRepository.addToCart(cid, cart);
  return result;
};

const updateQuantity = async (cid, pid, quantity) => {
  const cart = await getCartById(cid);
  if (!cart) {
    throw new CartNotFound('Cart not found')
  }
  await productsService.getProductById(pid);
  const productInCart = cart.products.findIndex(
    (p) => p.product._id.toString() === pid.toString()
  );
  if (productInCart !== -1) {
    cart.products[productInCart].quantity += quantity;
  }
  const result = await CARTS_DAO.updateQuantity(cart);
  return result;
};

const deleteProductInCart = async (cid, pid) => {
  const cart = await getCartById(cid);
  if (!cart) {
    throw new CartNotFound('Cart not found')
  }
  await productsService.getProductById(pid);
  const productInCart = cart.products.findIndex(
    (p) => p.product._id.toString() === pid.toString()
  );
  if (productInCart !== -1) {
    cart.products.splice(productInCart, 1);
  } else {
    throw new ProductNotFound('Product not found')
  }
  const result = await cartsRepository.deleteProductInCart(cart);
  return result;
};

const deleteAllProductsInCart = async (cid) => {
  const cart = await getCartById(cid);
  if (!cart) {
    throw new CartNotFound('Cart not found')
  }
  cart.products.splice(0, cart.products.length);
  const result = await cartsRepository.deleteAllProducts(cart);
  return result;
};

const purchase = async (cid, user) => {
  const cart = await getCartById(cid);
  if (!cart) {
    throw new CartNotFound('Cart not found')
  }
  const purchaser = user.email;
  let productsWithoutStock = [];
  let amount = 0;
  if (cart.products.length <= 0) {
    throw new CartWithoutStock('Cart without stock')
  }
  cart.products.forEach(async ({ product, quantity }) => {
    if (product.stock >= quantity) {
      amount += quantity * product.price;
      product.stock -= quantity;
      await PRODUCTS_DAO.update(product._id, product);
    } else {
      productsWithoutStock.push({ product, quantity });
    }
  });

  if (productsWithoutStock.length > 0) {
    await updateCart(cart._id, {
      products: productsWithoutStock,
    });
  }

  const result = await createTicketService(
    purchaser,
    amount,
    productsWithoutStock
  );
  return result;
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

// console.log(cart);
// const purchaser = user;
// const ticket = {
//   cart, purchaser
// }
// return ticket
