const playgroundsService = require("../services/playground.service");
const playgroundsDaos = require("../daos/playground.daos");

const getAttractions = async (req, res, next) => {
  const attractions = await playgroundsDaos.getAllAttractions();
  res.status(200).json(attractions);
};

const getAllAreas = async (req, res, next) => {
  const areas = await playgroundsDaos.getAllAreas();
  res.status(200).json(areas);
};

const getPlayground = async (req, res, next) => {
  const playgrounds = await playgroundsService.getPlayground(req.query);
  res.status(200).json(playgrounds);
};

const filterPlayground = async (req, res, next) => {
  const playgrounds = await playgroundsService.filterPlayground(req.query);
  res.status(200).json(playgrounds);
};
const getReviews = async (req, res, next) => {
  const reviews = await playgroundsDaos.getReviews(req.params.id);
  res.status(200).json(reviews);
};
const postReview = async (req, res, next) => {
  req.body.userId = req.session.user.id;
  console.log("req.body", req.body);
  const review = await playgroundsDaos.postReview(req.params.id, req.body);
  res.status(200).json(review);
};

const getPlaygroundDetails = async (req, res) => {
  const playground = await playgroundsService.getPlaygroundDetails(
    req.params.id
  );
  res.status(200).json(playground);
};

const addToFavorites = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const { playgroundId } = req.body;
    const result = await playgroundsService.addToFavorites(
      userId,
      playgroundId
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const removeFromFavorites = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const { playgroundId } = req.params;
    const result = await playgroundsService.removeFromFavorites(
      userId,
      playgroundId
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getFavorites = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const { limit, page } = req.query;
    const favorites = await playgroundsService.getFavorites(
      userId,
      limit,
      page
    );
    res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlayground,
  filterPlayground,
  getAttractions,
  getAllAreas,
  getReviews,
  postReview,
  getPlaygroundDetails,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
};
