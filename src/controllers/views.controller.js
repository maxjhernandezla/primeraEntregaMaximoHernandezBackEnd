import { getCartById as getCartByIdService } from "../services/carts.services.js";
import * as productsService from "../services/products.services.js";
import * as ticketsService from "../services/tickets.service.js";
import * as usersService from "../services/users.services.js";
import { verifyToken } from "../utils/utils.js";
import * as cartsService from "../services/carts.services.js";

const products = async (req, res) => {
  try {
    const { limit, page, sort, category, status } = req.query;
    let products = [];
    let token;
    const cookie = req.cookies["sessionCookie"];
    let cartId; // Declarar cartId fuera del bloque if
    let userByEmail;

    if (cookie) {
      token = verifyToken(cookie);
      userByEmail = await usersService.getUserByEmail(token.user.email);
      if (userByEmail.role !== "admin") {
        cartId = userByEmail.cart._id.toString();
      }
    }

    const { docs } = await productsService.getProducts({
      limit,
      page,
      sort,
      category,
      status,
    });

    if (cartId) {
      products = docs.map((product) => ({ ...product, cartId }));
    } else {
      products = docs;
      products = docs.map((product) => ({
        ...product,
        role: userByEmail?.role,
      }));
    }

    res.render("products", { products, user: token?.user });
  } catch (error) {
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productsService.getProductById(pid);
    res.render("product", { product });
  } catch (error) {
    res.status(500).send({ error: "error", error });
  }
};

const getCartById = async (req, res) => {
  try {
    const user = req?.user;
    const userByEmail = await usersService.getUserByEmail(user.email);
    const cartId = userByEmail.cart._id.toString();
    const { products } = await cartsService.getCartById(cartId);
    const productsWithCartId = products.map((p) => ({ ...p, cartId }));
    res.render("carts", { products: productsWithCartId, cartId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    res.send(500).json({ status: "error", error });
  }
};

const register = async (req, res) => {
  res.render("register");
};

const logout = async (req, res) => {
  res.render("logout");
};

const resetPassword = async (req, res) => {
  res.render("resetPassword");
};

const recoverPassword = async (req, res) => {
  res.render("recoverPassword");
};

const index = async (req, res) => {
  res.render("index");
};

const admin = async (req, res) => {
  const users = await usersService.getAllUsers();
  res.render("admin", { users });
};

const purchase = async (req, res) => {
  try {
    const { tid } = req.params;
    const user = req?.user;
    const ticket = await ticketsService.getTicketById(tid);
    res.render("purchase", { ticket, user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const account = async (req, res) => {
  try {
    const user = req.user;
    res.render("account", { user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export {
  products,
  getProductById,
  getCartById,
  login,
  register,
  resetPassword,
  recoverPassword,
  index,
  admin,
  purchase,
  logout,
  account
};
