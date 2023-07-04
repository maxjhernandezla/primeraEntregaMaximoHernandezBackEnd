import { getCartById as getCartByIdService } from "../services/carts.services.js";
import {
  getProducts as getProductsService,
  getProductById as getProductByIdService,
} from "../services/products.services.js";

const getProducts = async (req, res) => {
  const { limit, page, sort, category, status } = req.query;
  try {
    const { docs } = await getProductsService({
      limit,
      page,
      sort,
      category,
      status,
    });
    res.render("products", { products: docs, user: req.session.user });
  } catch (error) {
    res.sendServerError(error.message);
  }
};

const getProductById = async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await getProductByIdService(pid);
    res.render("product", { product });
  } catch (error) {
    res.status(500).send({ error: "error", error });
  }
};

const getCartById = async (req, res) => {
  const { cid } = req.params;
  try {
    const { products } = await getCartByIdService(cid);
    res.render("carts", { products });
  } catch (error) {
    res.status(500).send({ error: "error", error });
  }
};

const login = async (req, res) => {
  res.render("login");
};

const register = async (req, res) => {
  res.render("register");
};

const reset = async (req, res) => {
  res.render("reset");
};

export { getProducts, getProductById, getCartById, login, register, reset };
