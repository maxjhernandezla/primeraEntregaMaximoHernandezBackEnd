import Router from "./router.js";
import Users from "../dao/managers/dbManagers/usersManager.js";
import {passportStrategiesEnum} from "../config/enums.config.js";
import { createHash, isValidPassword, generateToken } from "../utils.js";
import Cart from "../dao/managers/dbManagers/cartsManager.js";
const usersManager = new Users();
const cartsManager = new Cart()

export default class UsersRouter extends Router {
  init() {
    this.post("/login", ["PUBLIC"], passportStrategiesEnum.NOTHING, this.login);
    this.post("/register",["PUBLIC"], passportStrategiesEnum.NOTHING, this.register);
    this.get('/', ['PUBLIC'], passportStrategiesEnum.NOTHING, async(req, res) => {
      const {email} = req.body
      const result = await usersManager.getByEmail(email)
      res.sendSuccess(result)
    })
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await usersManager.getByEmail(email);
      if (!user) return res.sendClientError("incorrect credentials");

      const comparePassword = isValidPassword(user, password);
      if (!comparePassword) return res.sendClientError("incorrect credentials");
      delete user.password;
      const accessToken = generateToken(user);
      res.sendSuccess({ accessToken });
    } catch (error) {
      res.sendServerError(error.message);
    }
  }

  async register(req, res) {
    try {
      const { first_name, last_name, email, age, password, role } = req.body;
      if (!first_name || !last_name || !email || !age || !password || !role)
        return res.sendClientError("incomplete credentials");
      const exists = await usersManager.getByEmail(email);
      if (exists) return res.sendClientError("user already exists");
      const hashedPassword = createHash(password)
      const newUser = {...req.body}
      newUser.password = hashedPassword
      const cart = await cartsManager.create()
      newUser.cart = cart;
      const result = await usersManager.save(newUser)
      res.sendSuccess(result)
    } catch (error) {
      res.sendServerError(error.message);
    }
  }

  
}
