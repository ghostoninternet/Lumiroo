const playgroundDaos = require("../daos/playground.daos");
const userDaos = require("../daos/user.daos");
const { NotFoundError } = require("../errors/customError");
const mongoose = require("mongoose");

const getPlayground = async ({ limit, page }) => {
  const totalPlaygrounds = await playgroundDaos.countTotalPlaygrounds({});
  const playgrounds = await playgroundDaos.getPlaygrounds({}, limit, page);
  const totalPage = Math.ceil(totalPlaygrounds / limit);

  return {
    data: playgrounds,
    pagination: {
      totalPage: totalPage,
      limitPerPage: limit,
      currentPage: page,
    },
  };
};

const filterPlayground = async (filterParams) => {
  // area, attractions, openingTime, closingTime, minAdmissionFee, maxAdmissionFee, limit, page
  const {
    area,
    attractions,
    openingTime,
    closingTime,
    minAdmissionFee,
    maxAdmissionFee,
    limit,
    page,
  } = filterParams;
  let condition = {};

  if (area) {
    condition = {
      area: area,
    };
  }

  if (attractions) {
    const attractionsObjectId = attractions.map(
      (attraction) => new mongoose.Types.ObjectId(attraction)
    );
    condition = {
      ...condition,
      attractions: { $in: attractionsObjectId },
    };
  }

  if (openingTime) {
    condition = {
      ...condition,
      openingTime: { $lte: openingTime },
    };
  }

  if (closingTime) {
    condition = {
      ...condition,
      closingTime: { $gte: closingTime },
    };
  }

  condition = {
    ...condition,
    admissionFee: { $gte: minAdmissionFee, $lte: maxAdmissionFee },
  };

  const totalPlaygrounds = await playgroundDaos.countTotalPlaygrounds(
    condition
  );
  const playgrounds = await playgroundDaos.getPlaygrounds(
    condition,
    limit,
    page
  );

  const totalPage = Math.ceil(totalPlaygrounds / limit);

  return {
    data: playgrounds,
    pagination: {
      totalPage: totalPage,
      limitPerPage: limit,
      currentPage: page,
    },
  };
};

const getPlaygroundDetails = async (id) => {
  const playground = await playgroundDaos.getPlaygroundById(id);
  if (!playground) {
    throw new NotFoundError("Playground not found");
  }
  return playground;
};

const addToFavorites = async (userId, playgroundId) => {
  const playgroundExists = await playgroundDaos.getPlaygroundById(playgroundId);
  if (!playgroundExists) {
    throw new NotFoundError("Playground not found");
  }

  const user = await userDaos.findUserById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const updatedUser = await userDaos.addFavoritePlayground(
    userId,
    playgroundId
  );
  return updatedUser.favoritePlayground;
};

const removeFromFavorites = async (userId, playgroundId) => {
  const user = await userDaos.findUserById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const updatedUser = await userDaos.removeFavoritePlayground(
    userId,
    playgroundId
  );
  return updatedUser.favoritePlayground;
};

const getFavorites = async (userId, limit, page) => {
  const user = await userDaos.findUserById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const populatedUser = await userDaos.populateUserFavorites(
    userId,
    limit,
    page
  );
  const totalFavorites = user.favoritePlayground.length;
  const totalPage = Math.ceil(totalFavorites / limit);

  return {
    data: populatedUser.favoritePlayground,
    pagination: {
      totalPage,
      limitPerPage: parseInt(limit),
      currentPage: parseInt(page),
    },
  };
};

module.exports = {
  getPlayground,
  filterPlayground,
  getPlaygroundDetails,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
};
