import { createTicket as createTicketService } from "./tickets.service.js";
import CartsRepository from "../repositories/carts.repository.js";
import * as productsService from "./products.services.js";
import {
  CartNotFound,
  CartWithoutStock,
  ProductNotFound,
  OwnerCantAddProduct,
  ProductWhitoutStock
} from "../utils/custom-exceptions.js";
import { Carts } from "../dao/factory.js";
import * as usersService from './users.services.js'

const cartsDAO = new Carts();
const cartsRepository = new CartsRepository(cartsDAO);

const getCarts = async () => {
  const carts = await cartsRepository.getAll();
  return carts;
};

const getCartById = async (cid) => {
  const cart = await cartsRepository.getById(cid);
  if (!cart) {
    throw new CartNotFound("Cart not found");
  }
  return cart;
};

const createCart = async () => {
  const result = await cartsRepository.create();
  return result;
};

const updateCart = async (cid, cart) => {
  const exists = await getCartById(cid);
  if (!exists) {
    throw new CartNotFound("Cart not found");
  }
  const result = await cartsRepository.update(cid, cart);
  return result;
};

const addToCart = async (cid, pid, email) => {
  const cart = await getCartById(cid);
  if (!cart) {
    throw new CartNotFound("Cart not found");
  }
  const product = await productsService.getProductById(pid);
  if (!product) {
    throw new ProductNotFound("Product not found");
  }
  if (product.owner === email) {
    throw new OwnerCantAddProduct(
      "You are the owner of this product so you can not add it to your cart"
    );
  }
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
    throw new CartNotFound("Cart not found");
  }
  await productsService.getProductById(pid);
  const productInCart = cart.products.findIndex(
    (p) => p.product._id.toString() === pid.toString()
  );
  if (productInCart !== -1) {
    cart.products[productInCart].quantity += quantity;
  }
  const result = await cartsRepository.updateQuantity(cart);
  return result;
};

const deleteProductInCart = async (cid, pid) => {
  const cart = await getCartById(cid);
  if (!cart) {
    throw new CartNotFound("Cart not found");
  }
  await productsService.getProductById(pid);
  const productInCart = cart.products.findIndex(
    (p) => p.product._id.toString() === pid.toString()
  );
  if (productInCart !== -1) {
    cart.products.splice(productInCart, 1);
  } else {
    throw new ProductNotFound("Product not found");
  }
  const result = await cartsRepository.deleteProductInCart(cart);
  return result;
};

const deleteAllProductsInCart = async (cid) => {
  const cart = await getCartById(cid);
  if (!cart) {
    throw new CartNotFound("Cart not found");
  }
  cart.products.splice(0, cart.products.length);
  const result = await cartsRepository.deleteAllProducts(cart);
  return result;
};

const purchase = async (cid, user) => {
  const cart = await getCartById(cid);
  if (!cart) {
    throw new CartNotFound("Cart not found");
  }
  const purchaser = user.email;
  let productsWithoutStock = [];
  let amount = 0;
  if (cart.products.length <= 0) {
    throw new CartWithoutStock("Cart without stock");
  }
  cart.products.forEach(async ({ product, quantity }) => {
    if (product.stock >= quantity) {
      amount += quantity * product.price;
      product.stock -= quantity;
      await productsService.updateProduct(product._id, product);
    } else {
      productsWithoutStock.push({ product, quantity });
    }
  });

  if (productsWithoutStock.length > 0) {
    throw new ProductWhitoutStock("One or more of the chosen products doesn't have stock")
  }

  const ticket = await createTicketService(
    purchaser,
    amount,
    productsWithoutStock
  );
  return ticket;
};

const closeCart = async (cid, user) => {
  const cart = await getCartById(cid);
  if (!cart) throw new CartNotFound('Cart not found')
  const userByEmail = await usersService.getUserByEmail(user.email);
  userByEmail.closedCarts.push(cart);
  const newCart = await createCart();
  userByEmail.cart = newCart;
  await usersService.updateUser(userByEmail)
}

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
  closeCart
};
