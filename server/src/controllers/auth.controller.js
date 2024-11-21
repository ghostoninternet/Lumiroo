const authService = require('../services/auth.service')

const signin = async (req, res, next) => {
  const authInfo = await authService.signin(req.body)
  res.status(200).json(authInfo)
}

const signup = async (req, res, next) => {
  const newUser = await authService.signup(req.body)
  res.status(200).json(newUser)
}

const refreshToken = async (req, res, next) => {

}

const logout = async (req, res, next) => {

}

module.exports = {
  signin,
  signup,
  refreshToken,
  logout,
}