import UsersRepository from "../repositories/users.repository.js";

const usersRepository = new UsersRepository()

const getUserByEmail = async (email) => {
  const user = await usersRepository.getUserByEmail(email);
  return user;
};

const createUser = async (user) => {
  const result = await usersRepository.save(user);
  return result;
};

const getAllUsers = async () => {
  const users = await usersRepository.getAll();
  return users;
};

export { getUserByEmail, createUser, getAllUsers };
