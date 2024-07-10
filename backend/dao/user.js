const userModel = require('../models/user')

const createUser = async (userInfo) => {
    return await userModel.create({ ...userInfo })
}
const findUserWithUsername = async ({ username }) => {
    return await userModel.findOne({ username })
}
const findUser = async ({ username, password }) => {
    return await userModel.findOne({ username, password })
}

module.exports = {
    createUser,
    findUser,
    findUserWithUsername
}