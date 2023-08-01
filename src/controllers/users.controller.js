import {
  getUserByEmail as getUserByEmailService,
  createUser as createUserService,
  getAllUsers as getAllUsersService,
} from "../services/users.services.js";
import { createCart as createCartService } from "../services/carts.services.js";
import { generateToken, isValidPassword, createHash } from "../utils.js";
import UserDto from "../dao/DTOs/users.dto.js";
import { registerEmail } from "../mailing/mailing.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmailService(email);
    if (!user) return res.sendClientError("incorrect credentials");
    const comparePassword = isValidPassword(user, password);
    if (!comparePassword) return res.sendClientError("incorrect credentials");
    const dtoUser = new UserDto(user);
    const accessToken = generateToken(dtoUser);
    req.logger.info(`INFO => date: ${new Date()} - message: ${user.email} logged in`);
    res.sendSuccess({ accessToken });
  } catch (error) {
    req.logger.error(`ERROR => date: ${new Date()} - message: ${error.message}`);
    res.sendServerError(error.message);
  }
};

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;
    if (!first_name || !last_name || !email || !age || !password || !role)
      return res.sendClientError("incomplete credentials");
    const exists = await getUserByEmailService(email);
    if (exists) return res.sendClientError("user already exists");
    const hashedPassword = createHash(password);
    const newUser = { ...req.body };
    newUser.password = hashedPassword;
    if (role === "user") {
      const cart = await createCartService();
      newUser.cart = cart;
    }
    const result = await createUserService(newUser);
    if (result) {
      await registerEmail(newUser)
    }
    req.logger.info(`INFO => date: ${new Date()} - message: new user registered`);
    res.sendSuccess(result);
  } catch (error) {
    req.logger.error(`ERROR => date: ${new Date()} - message: ${error.message}`);
    res.sendServerError(error.message);
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await getUserByEmailService(email);
    res.sendSuccess(result);  
  } catch (error) {
    req.logger.error(`ERROR => date: ${new Date()} - message: ${error.message}`);
    res.sendServerError(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await getAllUsersService();
    res.sendSuccess(result);
  } catch (error) {
    req.logger.error(`ERROR => date: ${new Date()} - message: ${error.message}`);
    res.sendServerError(error.message);
  }
};

export { login, register, getUserByEmail, getAllUsers };
