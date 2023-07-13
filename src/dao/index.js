import ProductsDao from "./managers/dbManagers/productsManager.js";
import CartsDao from "./managers/dbManagers/cartsManager.js";
import UsersDao from "./managers/dbManagers/usersManager.js";
import TicketsDao from './managers/dbManagers/ticketsManager.js'

const MongoUsersDao = new UsersDao()
const MongoCartsDao = new CartsDao();
const MongoProductsDao = new ProductsDao();
const MongoTicketsDao = new TicketsDao();

export const CARTS_DAO = MongoCartsDao;
export const PRODUCTS_DAO = MongoProductsDao;
export const USERS_DAO = MongoUsersDao;
export const TICKETS_DAO = MongoTicketsDao;
