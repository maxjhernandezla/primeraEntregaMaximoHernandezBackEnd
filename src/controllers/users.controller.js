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
    res.sendSuccess({ accessToken });
  } catch (error) {
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
    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.body;
  const result = await getUserByEmailService(email);
  res.sendSuccess(result);
};

const getAllUsers = async (req, res) => {
  const result = await getAllUsersService();
  res.sendSuccess(result);
};

export { login, register, getUserByEmail, getAllUsers };
