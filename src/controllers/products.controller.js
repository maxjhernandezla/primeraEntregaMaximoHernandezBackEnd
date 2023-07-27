import {
  getProducts as getProductsService,
  getProductById as getProductByIdService,
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "../services/products.services.js";
import { generateProductErrorAttributes, generateProductErrorIdNotFound } from "../middlewares/errors/info.js";
import CustomError from "../middlewares/errors/CustomError.js";
import { generateMockProduct } from "../utils.js";
import EErrors from "../middlewares/errors/enums.js";

const getProducts = async (req, res) => {
  const { limit, page, sort, category, status } = req.query;
  try {
    const products = await getProductsService({
      limit,
      page,
      sort,
      category,
      status,
    });
    res.send(products);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const getProductById = async (req, res) => {
    const { pid } = req.params;
    const result = await getProductByIdService(pid);
    if (!result) {
      throw CustomError.createError({
        name: "ID_NOT_FOUND",
        cause: generateProductErrorIdNotFound(pid),
        message: "Error trying find the product.",
        code: EErrors.ID_NOT_FOUND,
      });
    }
    res.send(result);
};

const createProduct = async (req, res) => {
  const { title, description, price, image, category, stock, code, status } =
    req.body;
  if (!title || !description || !price || !category || !stock || !code) {
    throw CustomError.createError({
      name: "TYPE_ERROR",
      cause: generateProductErrorAttributes(req.body),
      message: "Error trying to create the product.",
      code: EErrors.INVALID_TYPE_ERROR,
    });
  }
  const result = await createProductService({ ...req.body });
  res.send(result);
};

const updateProduct = async (req, res) => {
  try {
    const { title, description, price, image, category, stock, code, status } =
      req.body;
    const { pid } = req.params;
    if (!title || !description || !price || !category || !stock || !code) {
      return res.status(400).sendClientError("incomplete values");
    }
    const result = await updateProductService(pid, { ...req.body });
    res.send(result);
  } catch (error) {

    res.sendServerError(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const exists = await getProductByIdService(pid);
    if (!exists) return res.sendClientError("product not found");
    const result = await deleteProductService(pid);
    res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getMocksProducts = async (req, res) => {
  try {
    let products = [];
    for (let i = 0; i < 100; i++) {
      products.push(generateMockProduct());
    }
    res.send(products);
  } catch (error) {
    console.log(error.message);
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMocksProducts,
};

// const createProduct = async (req, res) => {
//   try {
//     const { title, description, price, image, category, stock, code, status } =
//       req.body;
//     if (!title || !description || !price || !category || !stock || !code) {
//       return res.status(400).sendClientError("incomplete values");
//     }
//     const result = await createProductService({ ...req.body });
//     res.sendSuccess(result);
//   } catch (error) {
//     res.sendServerError(error.message);
//   }
// };

// {
//   "title": "", "description": "", "price": "", "image": "", "category": "", "stock": "", "code": "", "status": ""
// }
