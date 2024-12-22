const adminService = require('../services/admin.service')

const getManyUsers = async (req, res, next) => {
  try {
    const users = await  adminService.getManyUsers(req.query)
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

const getUserDetail = async (req, res, next) => {
  console.log(req.params)
  const user = await adminService.getUserDetail(req.params.userId)
  res.status(200).json(user)
}

const searchUsers = async (req, res, next) => {
  const users = await adminService.searchUsers(req.query)
  res.status(200).json(users)

}

const updateUser = async (req, res, next) => {
  const user = await adminService.updateUser(req.params.userId, req.body)
  res.status(200).json({
    message: 'Update user successfully',
    user
  }
  )
}

const deleteUser = async (req, res, next) => {
  const user = await adminService.deleteUser(req.params.userId)
  res.status(200).json({
    message: 'Delete user successfully',
    user
  })

}

const getManyPlaygrounds = async (req, res, next) => {

}

const getPlaygroundDetail = async (req, res, next) => {

}

const createNewPlayground = async (req, res, next) => {

}

const updatePlayground = async (req, res, next) => {

}

const deletePlayground = async (req, res, next) => {

}

const getDashboardData = async (req, res, next) => {

}

module.exports = {
  getManyUsers,
  getUserDetail,
  searchUsers,
  updateUser,
  deleteUser,
  getManyPlaygrounds,
  getPlaygroundDetail,
  createNewPlayground,
  updatePlayground,
  deletePlayground,
  getDashboardData
}