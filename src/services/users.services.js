import UsersRepository from "../repositories/users.repository.js";
import {
  UserAlreadyExists,
  UserNotFound,
  EmptyDocuments,
  CanNotChangeRole,
} from "../utils/custom-exceptions.js";
import { Users } from "../dao/factory.js";
import { generateToken, __mainDirname } from "../utils/utils.js";
import UserDto from "../dao/DTOs/users.dto.js";
import { deletedDueToInactivity } from "../mailing/mailing.js";

const usersDAO = new Users();
const usersRepository = new UsersRepository(usersDAO);

const getUserByEmail = async (email) => {
  const user = await usersRepository.getUserByEmail(email);
  if (!user) {
    throw new UserNotFound("User not found");
  }
  return user;
};

const getUserByEmailRegister = async (email) => {
  const user = await usersRepository.getUserByEmail(email);
  if (user) {
    throw new UserAlreadyExists("User already exists");
  }
};

const createUser = async (user) => {
  const result = await usersRepository.save(user);
  return result;
};

const getAllUsers = async () => {
  const users = await usersRepository.getAll();
  const usersWithDto = users.map((user) => new UserDto(user));
  return usersWithDto;
};

const updateUser = async (user) => {
  const result = await usersRepository.update(user);
  return result;
};

const getUserById = async (uid) => {
  const user = await usersRepository.getUserById(uid);
  if (!user) {
    throw new UserNotFound("User not found");
  }
  return user;
};

const premium = async (user) => {
  const accountVerification = user.documents.find((d) => d.name === "account");
  const idVerification = user.documents.find((d) => d.name === "id");
  const addressVerification = user.documents.find((d) => d.name === "address");

  if (user.role === "premium") {
    user.role = "user";
    updateUser(user);
  } else if (user.role === "user") {
    if (!accountVerification || !idVerification || !addressVerification) {
      throw new CanNotChangeRole(
        "You must upload all your documentation to become a premium user"
      );
    }
    user.role = "premium";
    updateUser(user);
  } else if (user.role === "admin") {
    throw new CanNotChangeRole(
      "You are an admin user, can not change tour role"
    );
  }
  const userDto = new UserDto(user);
  const token = generateToken(userDto);
  return token;
};

const uploadDocuments = async (uid, files, type) => {
  const user = await usersRepository.getUserById(uid);
  if (!user) {
    throw new UserNotFound("User not found");
  }

  let documentsToAdd = [];

  files.forEach(async (file) => {
    const newDocument = { name: file.fieldname, reference: file.filename };
    const existingDocumentIndex = user.documents.findIndex(
      (doc) => doc.name === newDocument.name
    );

    if (existingDocumentIndex !== -1) {
      user.documents[existingDocumentIndex] = newDocument;
    } else {
      documentsToAdd.push(newDocument);
    }
  });

  user.documents = [...user.documents, ...documentsToAdd];

  if (user.documents.length === 0) {
    throw new EmptyDocuments("You did not attach any document");
  }

  const result = await usersRepository.update(user);
  return result;
};

const deleteOldUsers = async (users) => {
  const now = new Date();
  const thirtyMinutesInMilliseconds = 30 * 60 * 1000;

  const oldUsersEmails = users
    .filter((user) => {
      const lastConnectionDate = new Date(user.last_connection);
      const timeDifferenceMs = now - lastConnectionDate;
      return timeDifferenceMs > thirtyMinutesInMilliseconds;
    })
    .map((user) => user.email);

  oldUsersEmails.forEach(email => {
    deletedDueToInactivity(email)
  })
  
  const result = await usersRepository.deleteOldUsers(oldUsersEmails)
  return result
};

export {
  getUserById,
  getUserByEmail,
  createUser,
  getAllUsers,
  getUserByEmailRegister,
  updateUser,
  premium,
  uploadDocuments,
  deleteOldUsers,
};
