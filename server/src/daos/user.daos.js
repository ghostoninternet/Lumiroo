const usersModel = require('../models/users.model')

const findUserByEmail = async (email) => {
  const user = await usersModel.findOne({ email: email })
  return user
}

const createNewUser = async (newUserData) => {
  const newUser = await usersModel.create(newUserData)
  return newUser
}

module.exports = {
  findUserByEmail,
  createNewUser,
}