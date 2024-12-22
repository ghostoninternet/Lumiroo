const mongoose = require('mongoose')
const sessionsModel = require('../models/sessions.model')
const { DatabaseError } = require('../errors/customError')

const findOneSession = async (sessionId) => {
  return await sessionsModel.findOne({ sessionId: sessionId })
  .then((data) => data)
  .catch((err) => {
    console.log(err)
    throw new DatabaseError()
  })
}

const createNewSession = async (data) => {
  return await sessionsModel.create(data)
  .then((data) => data)
  .catch((err) => {
    console.log(err)
    throw new DatabaseError()
  })
}

const deleteOneSession = async (sessionId) => {
  return await sessionsModel.deleteOne({ sessionId })
  .then((data) => data)
  .catch((err) => {
    console.log(err)
    throw new DatabaseError()
  })
}

const deleteSessionByUserId = async (userId) => {
  return await sessionsModel.deleteMany({ userId })
  .then((data) => data)
  .catch((err) => {
    console.log(err)
    throw new DatabaseError()
  })
}

module.exports = {
  findOneSession,
  createNewSession,
  deleteOneSession,
  deleteSessionByUserId
}