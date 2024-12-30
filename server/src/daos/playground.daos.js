const { DatabaseError } = require("../errors/customError");
const playgroundsModel = require("../models/playgrounds.model");
const attractionsModel = require("../models/attractions.model");
const areasModel = require("../models/areas.model");
const reviewsModel = require("../models/reviews.model");

const countTotalPlaygrounds = async (condition) => {
  const totalPlaygrounds = await playgroundsModel.countDocuments(condition);
  return totalPlaygrounds;
};

const getAllAttractions = async () => {
  const attractions = await attractionsModel.find();
  return attractions;
};
// lấy review của playground theo id
const getReviews = async (playgroundId) => {
  const reviews = await reviewsModel
    .find({ playgroundId })
    .populate("userId", "id username avatarUrl")
    .then((data) => data)
    .catch((err) => {
      console.error(err);
      throw new DatabaseError("Something went wrong at getReviews");
    });
  return reviews;
};

const getAllAreas = async () => {
  const areas = await areasModel.find();
  return areas;
};

const getPlaygrounds = async (condition, limit = 8, page = 1) => {
  const playgrounds = await playgroundsModel
    .find(condition)
    .sort({ _id: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .then((data) => data)
    .catch((err) => {
      console.error(err);
      throw new DatabaseError("Something went wrong at getPlaygrounds");
    });
  return playgrounds;
};

const postReview = async (playgroundId, reviewData) => {
  const playground = await playgroundsModel.findById(playgroundId);
  const review = await reviewsModel.create({ ...reviewData, playgroundId });
  const reviews = await reviewsModel.find({ playgroundId });
  const totalRating = reviews.reduce(
    (total, review) => total + review.rating,
    0
  );
  playground.ratingAvg = (totalRating / reviews.length).toFixed(1);
  await playground.save();
  return review;
};

const createPlayground = async (newPlayground) => {
  const playground = await playgroundsModel.create(newPlayground);
  return playground;
};

const updatePlayground = async (playgroundId, updatedData) => {
  const updatedPlayground = await playgroundsModel
    .findByIdAndUpdate(playgroundId, updatedData, { new: true })
    .lean()
    .then((data) => data)
    .catch((err) => {
      console.error(err);
      throw new DatabaseError("Something went wrong at updatePlayground");
    });
  return updatedPlayground;
};

const deletePlayground = async (playgroundId) => {
  await playgroundsModel.findByIdAndDelete(playgroundId);
};

const getPlaygroundDetail = async (playgroundId) => {
  const playground = await playgroundsModel.findById(playgroundId);
  return playground;
};

const getPlaygroundById = async (id) => {
  return await playgroundsModel
    .findById(id)
    .populate("attractions")
    .populate("reviews")
    .lean();
};

module.exports = {
  countTotalPlaygrounds,
  getPlaygrounds,
  getAllAttractions,
  getAllAreas,
  getReviews,
  postReview,
  getPlaygroundById,
  getPlaygroundDetail,
  createPlayground,
  updatePlayground,
  deletePlayground,
};
