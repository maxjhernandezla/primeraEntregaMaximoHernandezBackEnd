import * as productsService from "../services/products.services.js";
import {
  IncompleteValues,
  ProductNotFound,
} from "../utils/custom-exceptions.js";

const getProducts = async (req, res) => {
  const { limit, page, sort, category, status } = req.query;
  try {
    const products = await productsService.getProducts({
      limit,
      page,
      sort,
      category,
      status,
    });
    res.sendSuccess(products);
  } catch (error) {
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.status(500).send({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const result = await productsService.getProductById(pid);
    res.sendSuccess(result);
  } catch (error) {
    if (error instanceof ProductNotFound) {
      return res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.status(500).send({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const result = await productsService.createProduct({ ...req.body });
    res.sendSuccess(result);
  } catch (error) {
    if (error instanceof IncompleteValues) {
      return res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const result = await productsService.updateProduct(pid, { ...req.body });
    res.send(result);
  } catch (error) {
    if (error instanceof ProductNotFound) {
      return res.sendClientError(error.message);
    }
    if (error instanceof IncompleteValues) {
      return res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const result = await productsService.deleteProduct(pid);
    res.sendSuccess(result);
  } catch (error) {
    if (error instanceof ProductNotFound) {
      return res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

// {
//   "title": "", "description": "", "price": "", "image": "", "category": "", "stock": "", "code": "", "status": ""
// }

// const getProductById = async (req, res) => {
//   const { pid } = req.params;
//   const result = await getProductByIdService(pid);
//   if (!result) {
//     throw CustomError.createError({
//       name: "ID_NOT_FOUND",
//       cause: generateProductErrorIdNotFound(pid),
//       message: "Error trying find the product.",
//       code: EErrors.ID_NOT_FOUND,
//     });

//   }
//   res.send(result);
// };

// const createProduct = async (req, res) => {
//   const { title, description, price, image, category, stock, code, status } =
//     req.body;
//   if (!title || !description || !price || !category || !stock || !code) {
//     throw CustomError.createError({
//       name: "TYPE_ERROR",
//       cause: generateProductErrorAttributes(req.body),
//       message: "Error trying to create the product.",
//       code: EErrors.INVALID_TYPE_ERROR,
//     });
//   }
//   const result = await createProductService({ ...req.body });
//   res.send(result);
// };
