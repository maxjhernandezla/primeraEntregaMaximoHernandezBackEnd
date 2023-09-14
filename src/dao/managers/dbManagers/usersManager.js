import usersModel from '../../models/users.model.js'
import logger from "../../../middlewares/logger.js";

export default class Users {
    constructor() {
        logger.info('Working users from DB');
    }

    getAll = async () => {
        const users = await usersModel.find().lean()
        return users
    }

    getUserByEmail = async (email) => {
        const user = await usersModel.findOne({email}).lean()
        return user
    }

    getUserById = async (id) => {
        const user = await usersModel.findOne({_id: id}).lean()
        return user
    }

    save = async (user) => {
        const result = await usersModel.create(user)
        return result
    }

    update = async (user) => {
        const result = await usersModel.updateOne({ _id: user._id }, user)
        return result
    }

    deleteOldUsers = async (users) => {
        const result = await usersModel.deleteMany({ email: { $in: users } })
        return result
    }
}