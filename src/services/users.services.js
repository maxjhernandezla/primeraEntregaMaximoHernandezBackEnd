import { USERS_DAO } from "../dao/index.js";

const getUserByEmail = async (email) => {
  const user = await USERS_DAO.getUserByEmail(email);
  return user;
};

const createUser = async (user) => {
  const result = await USERS_DAO.save(user);
  return result;
};

const getAllUsers = async () => {
  const users = await USERS_DAO.getAll();
  return users;
};

export { getUserByEmail, createUser, getAllUsers };
