import {
  getProducts as getProductsService,
  getProductById as getProductByIdService,
  createProduct as createProductService,
  updateProduct as updateProductService
} from "../services/products.services.js";

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
    res.sendSuccess(products);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const result = await getProductByIdService(pid);
    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, description, price, image, category, stock, code, status } =
      req.body;
    if (!title || !description || !price || !category || !stock || !code) {
      return res.status(400).sendClientError("incomplete values");
    }
    const result = await createProductService({ ...req.body });
    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

const updateProduct = async (req, res) => {
    try {
      const {
        title,
        description,
        price,
        image,
        category,
        stock,
        code,
        status,
      } = req.body;
      const { pid } = req.params;
      if (!title || !description || !price || !category || !stock || !code) {
        return res.status(400).sendClientError("incomplete values");
      }
      const result = await updateProductService(pid, { ...req.body });
      res.sendSuccess(result);
    } catch (error) {
      res.sendServerError(error.message);
    }
  }

export { getProducts, getProductById, createProduct, updateProduct };
