import ProductsDao from "./managers/dbManagers/productsManager.js";
import CartsDao from "./managers/dbManagers/cartsManager.js";
import UsersDao from "./managers/dbManagers/usersManager.js";

const MongoUsersDao = new UsersDao()
const MongoCartsDao = new CartsDao();
const MongoProductsDao = new ProductsDao();

export const CARTS_DAO = MongoCartsDao;
export const PRODUCTS_DAO = MongoProductsDao;
export const USERS_DAO = MongoUsersDao;
