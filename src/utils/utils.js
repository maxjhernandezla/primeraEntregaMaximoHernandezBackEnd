import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/dotenv.config.js";
import { faker } from "@faker-js/faker";
import path from "path";
import { EmailNotMatchToken, ExpiredJWT } from "./custom-exceptions.js";


const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

const generateToken = (user) => {
  const token = jwt.sign({ user }, config.privateKey, { expiresIn: "24h" });
  return token;
};

const recoverPasswordToken = (user) => {
  const token = jwt.sign({ user }, config.privateKey, { expiresIn: "1h" });
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

const verifyToken = (token) => {
  const verifiedToken = jwt.verify(token, config.privateKey, (error, decoded) => {
    if (error) {
      throw new ExpiredJWT("The token has expired, please generate a new one.");
    } 
    return decoded
  });
  return verifiedToken
};

const tokenExpired = (token) => {
  const currentTime = Math.floor(Date.now() / 1000);
  if (token.exp && currentTime >= token.exp) {
    throw new ExpiredJWT("The token has expired, please generate a new one.");
  } 
};

const verifyEmail = (token, email) => {
  if (token.user.email !== email) {
    throw new EmailNotMatchToken("The requested email doesn't match the user's email")
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __mainDirname = path.join(__dirname, "..");

export {
  __mainDirname,
  tokenExpired,
  createHash,
  isValidPassword,
  generateToken,
  generateMockProduct,
  recoverPasswordToken,
  verifyToken,
  verifyEmail
};
