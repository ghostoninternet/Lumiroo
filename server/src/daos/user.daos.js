const usersModel = require('../models/users.model');

const findUserByEmail = async (email) => {
  return usersModel.findOne({ email });
};

const findUserById = async (id) => {
  return usersModel.findById(id);
};

const createNewUser = async (newUserData) => {
  return usersModel.create(newUserData);
};

module.exports = {
  findUserByEmail,
  findUserById,
  createNewUser,
};