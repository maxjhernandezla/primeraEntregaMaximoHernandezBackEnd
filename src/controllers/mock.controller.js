import { generateMockProduct } from "../utils/utils.js";

const getMocksProducts = async (req, res) => {
  try {
    let products = [];
    for (let i = 0; i < 100; i++) {
      products.push(generateMockProduct());
    }
    res.sendSuccess(products);
  } catch (error) {
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message)
  }
};

export { getMocksProducts };
