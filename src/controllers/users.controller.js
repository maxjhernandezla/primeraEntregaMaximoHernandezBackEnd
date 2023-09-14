import * as usersService from "../services/users.services.js";
import { EmptyDocuments, UserNotFound } from "../utils/custom-exceptions.js";

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await usersService.getUserByEmail(email);
    res.sendSuccess(result);
  } catch (error) {
    if (error instanceof UserNotFound) {
      res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await usersService.getAllUsers();
    res.sendSuccess(result);
  } catch (error) {
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const premium = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await usersService.getUserById(uid);
    const accessToken = await usersService.premium(user);
    res.cookie("sessionCookie", accessToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    res.sendSuccess({ accessToken });
  } catch (error) {
    if (error instanceof UserNotFound) {
      res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const uploadDocuments = async (req, res) => {
  try {
    const { type } = req.headers;
    const { uid } = req.params;
    const { files } = req;
    const result = await usersService.uploadDocuments(uid, files, type);
    res.sendSuccess(result);
  } catch (error) {
    if (error instanceof UserNotFound) {
      res.sendClientError(error.message);
    }
    if (error instanceof EmptyDocuments) {
      res.sendClientError(error.message);
    }
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
};

const deleteOldUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    const result = await usersService.deleteOldUsers(users)
    res.sendSuccess(result)
  } catch (error) {
    req.logger.error(
      `ERROR => date: ${new Date()} - message: ${error.message}`
    );
    res.sendServerError(error.message);
  }
}

export { getUserByEmail, getAllUsers, premium, uploadDocuments, deleteOldUsers };
