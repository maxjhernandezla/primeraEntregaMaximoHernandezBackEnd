import { recoverPasswordEmail } from "../mailing/mailing.js"
import { createHash, recoverPasswordToken, isValidPassword, generateToken } from "../utils/utils.js"
import UserDto from "../dao/DTOs/users.dto.js"
import * as cartsService from './carts.services.js'
import * as usersService from './users.services.js'
import UsersRepository from '../repositories/users.repository.js'
import { IncorrectLoginCredentials } from "../utils/custom-exceptions.js"
import { Users } from "../dao/factory.js";

const usersDAO = new Users()
const usersRepository = new UsersRepository(usersDAO);

const recoverPassword = async (user) => {
    const userDto = new UserDto(user)
    const token = recoverPasswordToken(userDto)
    const url = `http://localhost:8080/resetpassword/${user._id}`
    recoverPasswordEmail(user.email, url)
    return token
}

const login = async (password, user) => {
    const comparePassword = isValidPassword(user, password);
    if (!comparePassword) {
      throw new IncorrectLoginCredentials("Incorrect credentials");
    }
    const now = new Date().toISOString();
    user.last_connection = now;
    await usersService.updateUser(user);
    const dtoUser = new UserDto(user);
    const accessToken = generateToken(dtoUser);
    return accessToken;
  };
  
  const register = async (user) => {
    const hashedPassword = createHash(user.password);
    user.password = hashedPassword;
    if (user.role !== 'admin') {
      const cart = await cartsService.createCart()
      user.cart = cart
    }
    const result = await usersRepository.save(user);
    return result;
  };

export {
    recoverPassword,
    login, register
}