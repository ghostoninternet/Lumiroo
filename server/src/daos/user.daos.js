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

const getUser = async (id) => {
  return usersModel.findById(id);
};

const updateUser = async (id, updateUserData) => {
  return usersModel.findByIdAndUpdate
    (id, updateUserData, { new: true });
}

const deleteUser = async (id) => {
  return usersModel.findByIdAndDelete(id);
};

module.exports = {
  findUserByEmail,
  findUserById,
  createNewUser,
  getUser,
  updateUser,
  deleteUser,
};