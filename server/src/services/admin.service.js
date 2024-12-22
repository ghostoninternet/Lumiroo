const userDaos = require('../daos/user.daos');
const sessionDaos = require('../daos/session.daos');
const { NotFoundError } = require('../errors/customError');
const mongoose = require('mongoose')

function calculateAge(dob) {
  const today = new Date(); 
  let age = today.getFullYear() - dob.getFullYear();
  const isBeforeBirthday = 
    today.getMonth() < dob.getMonth() || 
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate());

  if (isBeforeBirthday) {
    age--; 
  }
  return age;
}

const getManyUsers = async ({limit,page}) => {
  const totalUsers = await userDaos.countTotalUsers({})
  const dataUsers = await userDaos.getUsers({}, limit, page)
  const totalPage = Math.ceil(totalUsers / limit)
   const users= dataUsers.map(user => {
    return {
      id: user._id,
      name: user.username,
      age: user.dob ? calculateAge(user.dob) : null,
      phone: user.phoneNumber,
      area: user.address,
    }
  })

  return {
    data: users,  
    pagination: {
      totalPage: totalPage,
      limitPerPage: limit,
      currentPage: page,
    },
  }
}

const getUserDetail = async (userId) => {
  const result = await userDaos.getUser(userId)
  console.log(userId)
  console.log(result.username)
  console.log(result)
  const user = {
    id: result._id,
    name: result.username,
    address: result.address,
    birthDate: result.dob,
    status: !result.isDisabled,
    role: result.role,
  }
  if (!user) {
    throw new NotFoundError('User not found')
  }
  return user
}

const searchUsers = async (searchParams) => {
  const {name, phone , minAge ,maxAge, area, limit, page} = searchParams
  const minDob = maxAge ? new Date(new Date().setFullYear(new Date().getFullYear() - maxAge)) : null
  const maxDob = minAge ? new Date(new Date().setFullYear(new Date().getFullYear() - minAge)) : null
  console.log(minDob, maxDob)
  let condition = {}
  if(name) {
    condition = {
      username: { $regex: name, $options: 'i' }
    }
  }
  if(phone) {
    condition = {
      ...condition,
      phoneNumber: { $regex: phone, $options: 'i' }
    }
  }
  if(minDob && maxDob) {
    condition = {
      ...condition,
      dob: { $gte: minDob , $lte: maxDob }
    }
  } else
  if(minDob) {
    condition = {
      ...condition,
      dob: { $gte: minDob }
    }
  } else
  if(maxDob) {
    condition = {
      ...condition,
      dob: { $lte: maxDob }
    }
  }
  
  if (area && !area.includes("すべての地域")) {
    condition = {
      ...condition,
      address: { $regex: area, $options: 'i' }
    }
  }

  const totalUsers = await userDaos.countTotalUsers(condition)
  const dataUsers = await userDaos.getUsers(condition)

  const totalPage = Math.ceil(totalUsers / limit)

  const users= dataUsers.map(user => {
    return {
      id: user._id,
      name: user.username,
      age: user.dob ? calculateAge(user.dob) : null,
      phone: user.phoneNumber,
      area: user.address,
      avatar: user.avatarUrl,
    }
  })
  return {
    data: users,
    pagination: {
      totalPage: totalPage,
      limitPerPage: totalUsers,
      currentPage: page,
    },
  }
  
}

const updateUser = async (userId, data) => {
  const role = data.role
  const isDisabled = (data.status == 'アクティブ') ? false : true
  console.log(userId,role, isDisabled)
  const user = await userDaos.updateUser(userId,{role,isDisabled})
  return user
}

const deleteUser = async (userId) => {
  sessionDaos.deleteSessionByUserId(userId)
  const user = await userDaos.deleteUser(userId)
  return user

}

const getManyPlaygrounds = async () => {

}

const getPlaygroundDetail = async () => {

}

const createNewPlayground = async () => {

}

const updatePlayground = async () => {

}

const deletePlayground = async () => {

}

const getDashboardData = async () => {
  
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
  getDashboardData,
}
