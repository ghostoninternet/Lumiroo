const playgroundDaos = require('../daos/playground.daos')
const userDaos = require('../daos/user.daos');
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
  const playgroundExists = await playgroundDaos.getPlaygroundById(playgroundId);
  if (!playgroundExists) {
    throw new Error('Playground not found');
  }

  const user = await userDaos.findUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (!user.favoritePlayground.includes(playgroundId)) {
    user.favoritePlayground.push(playgroundId);
    await user.save();
  }

  return user.favoritePlayground;
};

const removeFromFavorites = async (userId, playgroundId) => {
  const user = await userDaos.findUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  user.favoritePlayground = user.favoritePlayground.filter(
    (id) => id.toString() !== playgroundId
  );
  await user.save();

  return user.favoritePlayground;
};

const getFavorites = async (userId) => {
  const user = await userDaos.findUserById(userId).populate('favoritePlayground');
  if (!user) {
    throw new Error('User not found');
  }

  return user.favoritePlayground;
};

module.exports = {
  getPlayground,
  filterPlayground,
  getPlaygroundDetails,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
}
