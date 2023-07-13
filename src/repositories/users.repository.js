import { USERS_DAO } from "../dao/index.js";

export default class UsersRepository {
    getUserByEmail = async (email) => {
        return await USERS_DAO.getUserByEmail(email);
      };
      
      save = async (user) => {
        return await USERS_DAO.save(user);
      };
      
      getAll = async () => {
        return await USERS_DAO.getAll();
      };
}