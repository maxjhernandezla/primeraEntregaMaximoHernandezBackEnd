import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../config/constants.config.js";
import { faker } from "@faker-js/faker";

const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" });
  return token;
};

const generateMockProduct = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    department: faker.commerce.department(),
    stock: faker.random.numeric(1),
    id: faker.database.mongodbObjectId(),
    image: faker.image.image(),
    description: faker.commerce.productDescription(),
    code: faker.random.alphaNumeric(10),
  };
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export {
  __dirname,
  createHash,
  isValidPassword,
  generateToken,
  generateMockProduct,
};
