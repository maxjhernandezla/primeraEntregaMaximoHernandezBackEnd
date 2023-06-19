import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "./config/constants.config.js";

const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" });
  return token;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export { __dirname, createHash, isValidPassword, generateToken };
