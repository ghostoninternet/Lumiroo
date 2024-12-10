const usersModel = require('../models/users.model');

const findUserByEmail = async (email) => {
  return usersModel.findOne({ email });
};

const findUserById = async (id) => {
  return usersModel.findById(id).lean();
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

// Thêm các hàm cập nhật favorites
const addFavoritePlayground = async (userId, playgroundId) => {
  return usersModel.findByIdAndUpdate(
    userId,
    { $addToSet: { favoritePlayground: playgroundId } },
    { new: true }
  );
};

const removeFavoritePlayground = async (userId, playgroundId) => {
  return usersModel.findByIdAndUpdate(
    userId,
    { $pull: { favoritePlayground: playgroundId } },
    { new: true }
  );
};

module.exports = {
  findUserByEmail,
  findUserById,
  createNewUser,
  getUser,
  updateUser,
  deleteUser,
  addFavoritePlayground,
  removeFavoritePlayground,
};