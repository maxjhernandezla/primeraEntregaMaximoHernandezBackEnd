import UserDto from "../dao/DTOs/users.dto.js";
import UsersRepository from "../repositories/users.repository.js";
import * as cartsService from './carts.services.js'
import {
  IncorrectLoginCredentials,
  UserAlreadyExists,
  UserNotFound,
} from "../utils/custom-exceptions.js";
import { createHash, generateToken, isValidPassword } from "../utils/utils.js";
import { Users } from "../dao/factory.js";

const usersDAO = new Users()
const usersRepository = new UsersRepository(usersDAO);

const getUserByEmail = async (email) => {
  const user = await usersRepository.getUserByEmail(email);
  if (!user) {
    throw new UserNotFound("User not found");
  }
  return user;
};

const getUserByEmailRegister = async (email) => {
  const user = await usersRepository.getUserByEmail(email);
  if (user) {
    throw new UserAlreadyExists("User already exists");
  }
};

const createUser = async (user) => {
  const result = await usersRepository.save(user);
  return result;
};

const getAllUsers = async () => {
  const users = await usersRepository.getAll();
  return users;
};

const login = async (password, user) => {
  const comparePassword = isValidPassword(user, password);
  if (!comparePassword) {
    throw new IncorrectLoginCredentials("Incorrect credentials");
  }
  const dtoUser = new UserDto(user);
  const accessToken = generateToken(dtoUser);
  return accessToken;
};

const register = async (user) => {
  const hashedPassword = createHash(user.password);
  user.password = hashedPassword;
  if (user.role === 'user') {
    const cart = await cartsService.createCart()
    user.cart = cart
  }
  const result = await usersRepository.save(user);
  //await registerEmail(user)
  return result;
};

export {
  getUserByEmail,
  createUser,
  getAllUsers,
  login,
  getUserByEmailRegister,
  register,
};
