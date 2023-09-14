import * as usersService from "../services/users.services.js";
import * as sessionsService from "../services/sessions.service.js";
import {
  createHash,
  isValidPassword,
  verifyEmail,
  verifyToken,
} from "../utils/utils.js";
import {
  UserNotFound,
  IncorrectLoginCredentials,
  UserAlreadyExists,
  isOldPasswordError,
  ExpiredJWT,
  EmailNotMatchToken,
} from "../utils/custom-exceptions.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.getUserByEmail(email);
    const accessToken = await sessionsService.login(password, user);
    res.cookie("sessionCookie", accessToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    res.sendSuccess({ accessToken });
  } catch (error) {
    if (error instanceof UserNotFound) {
      return res.sendClientError(error.message);
    }
    if (error instanceof IncorrectLoginCredentials) {
      return res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;
    if (!first_name || !last_name || !email || !age || !password || !role)
      return res.sendClientError("incomplete credentials");
    await usersService.getUserByEmailRegister(email);
    const register = await sessionsService.register({ ...req.body });
    req.logger.info(
      `INFO => date: ${new Date()} - message: new user registered`
    );
    res.sendSuccess(register);
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      return res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const logged = (req, res) => {
  try {
    const user = req.user;
    res.sendSuccess(user);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

const recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await usersService.getUserByEmail(email);
    const recoverToken = await sessionsService.recoverPassword(user);
    res.cookie("recoverPasswordCookie", recoverToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    res.sendSuccess({ recoverToken });
  } catch (error) {
    if (error instanceof UserNotFound) {
      return res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    console.log(error);
    res.sendServerError(error.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const cookie = req.cookies["recoverPasswordCookie"];
    const token = verifyToken(cookie);
    const { email, password } = req.body;
    const user = await usersService.getUserByEmail(email);
    verifyEmail(token, email);
    const isOldPassword = isValidPassword(user, password);
    if (isOldPassword)
      throw new isOldPasswordError(
        "Sorry, the password you provided matches one of your previous passwords. For security reasons, please choose a password that is different from your previous ones."
      );
    const hashedPassword = createHash(password);
    user.password = hashedPassword;
    await usersService.updateUser(user);
    res.sendSuccess("The password was updated successfully");
  } catch (error) {
    if (error instanceof UserNotFound) {
      return res.sendClientError(error.message);
    }
    if (error instanceof isOldPasswordError) {
      return res.sendClientError(error.message);
    }
    if (error instanceof ExpiredJWT) {
      return res.sendClientError(error.message);
    }
    if (error instanceof EmailNotMatchToken) {
      return res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const logout = async (req, res) => {
  try {
    res
      .clearCookie("sessionCookie")
      .send({ status: "success", payload: "Logout success" });
  } catch (error) {
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

export { logged, recoverPassword, resetPassword, login, register, logout };
