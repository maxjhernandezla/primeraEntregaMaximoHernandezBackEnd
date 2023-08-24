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

const updateUser = async (user) => {
  const result = await usersRepository.update(user)
  return result
}

export {
  getUserByEmail,
  createUser,
  getAllUsers,
  getUserByEmailRegister,
  updateUser
};
