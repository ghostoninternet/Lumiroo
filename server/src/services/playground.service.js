const playgroundDaos = require('../daos/playground.daos')
const favoritesDaos = require('../daos/favorites.daos');
const mongoose = require('mongoose')

const getPlayground = async({limit, page}) => {
  const totalPlaygrounds = await playgroundDaos.countTotalPlaygrounds({})
  const playgrounds = await playgroundDaos.getPlaygrounds({}, limit, page)
  const totalPage = Math.ceil(totalPlaygrounds / limit)

  return {
    data: playgrounds,
    pagination: {
      totalPage: totalPage,
      limitPerPage: limit,
      currentPage: page,
    },
  }
}

const filterPlayground = async (filterParams) => {
  // area, attractions, openingTime, closingTime, minAdmissionFee, maxAdmissionFee, limit, page
  const { area, attractions, openingTime, closingTime, minAdmissionFee, maxAdmissionFee, limit, page } = filterParams
  let condition = {}

  if (area) {
    condition = {
      area: area,
    }
  }

  if (attractions) {
    const attractionsObjectId = attractions.map(attraction => new mongoose.Types.ObjectId(attraction))
    condition = {
      ...condition,
      attractions: { $in: attractionsObjectId },
    }
  }

  if (openingTime) {
    condition = {
      ...condition,
      openingTime: { $gte: openingTime },
    }
  }

  if (closingTime) {
    condition = {
      ...condition,
      closingTime: { $lte: closingTime },
    }
  }

  condition = {
    ...condition,
    admissionFee: { $gte: minAdmissionFee, $lte: maxAdmissionFee },
  }

  const totalPlaygrounds = await playgroundDaos.countTotalPlaygrounds(condition)
  const playgrounds = await playgroundDaos.getPlaygrounds(condition, limit, page)

  const totalPage = Math.ceil(totalPlaygrounds / limit)

  return {
    data: playgrounds,
    pagination: {
      totalPage: totalPage,
      limitPerPage: limit,
      currentPage: page,
    },
  }
}

const getPlaygroundDetails = async (id) => {
  const playground = await playgroundDaos.getPlaygroundById(id);
  if (!playground) {
    throw new Error('Playground not found');
  }
  return playground;
};

const addToFavorites = async (userId, playgroundId) => {
  return await favoritesDaos.addToFavorites(userId, playgroundId);
};

const removeFromFavorites = async (userId, playgroundId) => {
  return await favoritesDaos.removeFromFavorites(userId, playgroundId);
};

const getFavorites = async (userId) => {
  return await favoritesDaos.getUserFavorites(userId);
};

module.exports = {
  getPlayground,
  filterPlayground,
  getPlaygroundDetails,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
}
