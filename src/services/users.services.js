import { USERS_DAO } from "../dao/index.js";

const getUserByEmail = async (email) => {
  const user = await USERS_DAO.getUserByEmail(email);
  return user;
};

const createUser = async (user) => {
    const result = await USERS_DAO.save(user)
    return result
}

export { getUserByEmail, createUser };
