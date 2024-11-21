const userModel = require('../models/user.model')

const findUserByEmail = async (email) => {
  const user = await userModel.findOne({ email: email })
  return user
}

const createNewUser = async (newUserData) => {
  const newUser = await userModel.create(newUserData)
  return newUser
}

module.exports = {
  findUserByEmail,
  createNewUser,
}