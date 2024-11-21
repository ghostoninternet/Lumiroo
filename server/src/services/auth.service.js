const bcrypt = require('bcrypt')
const userDaos = require('../daos/user.daos')
const { NotFoundError, BadRequestError, UserAlreadyExistError } = require('../errors/customError')

const signin = async ({ email, password }) => {
  const foundUser = await userDaos.findUserByEmail(email)
  if (!foundUser) throw new NotFoundError('User not found!')

  const passwordComapre = await bcrypt.compare(password, foundUser.password)
  if (!passwordComapre) throw new BadRequestError('Password is incorrect')
  
  return foundUser
}

const signup = async ({ email, password }) => {
  const foundUser = await userDaos.findUserByEmail(email)
  if (foundUser) throw new UserAlreadyExistError()

  const hashedPassword = await bcrypt.hash(password, 10)
  
  const newUserData = {
    email,
    password: hashedPassword,
  }

  const newUser = await userDaos.createNewUser(newUserData)

  return newUser
}

const refreshToken = async () => {

}

const logout = async () => {

}

module.exports = {
  signin,
  signup,
  refreshToken,
  logout,
}