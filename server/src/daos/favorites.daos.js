const favoritesModel = require('../models/favorites.model');

const getUserFavorites = async (userId) => {
  return await favoritesModel.findOne({ userId }).populate('playgrounds');
};

const addToFavorites = async (userId, playgroundId) => {
  const favorite = await favoritesModel.findOneAndUpdate(
    { userId },
    { $addToSet: { playgrounds: playgroundId } },
    { upsert: true, new: true }
  );
  return favorite;
};

const removeFromFavorites = async (userId, playgroundId) => {
  return await favoritesModel.findOneAndUpdate(
    { userId },
    { $pull: { playgrounds: playgroundId } },
    { new: true }
  );
};

module.exports = {
  getUserFavorites,
  addToFavorites,
  removeFromFavorites,
};