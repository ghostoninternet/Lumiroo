const userDaos = require('../daos/user.daos');
const sessionDaos = require('../daos/session.daos');
const playgroundDaos = require('../daos/playground.daos');
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
   const users = dataUsers.map(user => {
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

const getManyPlaygrounds = async ({limit,page}) => {
  const totalPlaygrounds = await playgroundDaos.countTotalPlaygrounds({})
  const dataPlaygrounds = await playgroundDaos.getPlaygrounds({}, limit, page)
  const totalPage = Math.ceil(totalPlaygrounds / limit)
  const playgrounds = dataPlaygrounds.map(playground => {
    return {
      id: playground._id,
      name: playground.name,
      address: playground.address,
      status: playground.status,
      owner: playground.owner,
    }
  })

  return {
    data: playgrounds,
    pagination: {
      totalPage: totalPage,
      limitPerPage: limit,
      currentPage: page,
    },
  }
}

const getPlaygroundDetail = async (playgroundId) => {
  const result = await playgroundDaos.getPlayground(playgroundId)
  console.log(playgroundId)
  console.log(result.name)
  console.log(result)
  const playground = {
    id: result._id,
    name: result.name,
    address: result.address,
    status: result.status,
    owner: result.owner,
  }
  if (!playground) {
    throw new NotFoundError('Playground not found')
  }
  return playground
}

const createNewPlayground = async (newPlaygroundData) => {
  const playground = await playgroundDaos.createPlayground(newPlaygroundData)
  return playground
}

const updatePlayground = async (playgroundId, data) => {
  const status = data.status
  const isDisabled = (data.status == 'アクティブ') ? false : true
  console.log(playgroundId,status, isDisabled)
  const playground = await playgroundDaos.updatePlayground(playgroundId,{status,isDisabled})
  return playground
}

const deletePlayground = async (playgroundId) => {
  const playground = await playgroundDaos.deletePlayground(playgroundId)
  return playground
}

const getDashboardData = async (dashboardData) => {
  const totalUsers = await userDaos.countTotalUsers({})
  const totalPlaygrounds = await playgroundDaos.countTotalPlaygrounds({})
  const totalAreas = await playgroundDaos.countTotalAreas({})
  const totalAttractions = await playgroundDaos.countTotalAttractions({})
  const totalReviews = await playgroundDaos.countTotalReviews({})
  return {
    totalUsers,
    totalPlaygrounds,
    totalAreas,
    totalAttractions,
    totalReviews,
  }  
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
