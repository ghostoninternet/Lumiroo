const usersModel = require("../models/users.model");

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
  return usersModel.findByIdAndUpdate(id, updateUserData, { new: true });
};

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

const countTotalUsers = async (condition) => {
  const totalUsers = await usersModel.countDocuments(condition);
  return totalUsers;
};

const getUsers = async (condition, limit = 5, page = 1) => {
  const users = await usersModel
    .find(condition)
    .skip((page - 1) * limit)
    .limit(limit)
    .then((data) => data)
    .catch((err) => {
      console.error(err);
      throw new DatabaseError(
        "Something went wrong at user.daos.js -> getUsers"
      );
    });
  return users;
};

const getManyUsers = async (condition) => {
  const users = await usersModel
    .find(condition)
    .lean()
    .then((data) => data)
    .catch((err) => {
      console.error(err);
      throw new DatabaseError(
        "Something went wrong at user.daos.js -> getManyUsers"
      );
    });
  return users;
}

const populateUserFavorites = async (userId, limit, page) => {
  return usersModel
    .findById(userId)
    .select("favoritePlayground")
    .populate({
      path: "favoritePlayground",
      options: {
        limit: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
      },
    });
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
  countTotalUsers,
  getUsers,
  getManyUsers,
  populateUserFavorites,
};
