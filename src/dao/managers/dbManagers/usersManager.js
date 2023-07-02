import usersModel from '../../models/users.model.js'

export default class Users {
    constructor() {
        console.log('Working users from DB');
    }

    getAll = async () => {
        const users = await usersModel.find().lean()
        return users
    }

    getUserByEmail = async (email) => {
        const user = await usersModel.findOne({email}).lean()
        return user
    }

    save = async (user) => {
        const result = await usersModel.create(user)
        return result
    }

}