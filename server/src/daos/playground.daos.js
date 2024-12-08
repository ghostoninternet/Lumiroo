const { DatabaseError } = require('../errors/customError')
const playgroundsModel = require('../models/playgrounds.model')
const attractionsModel = require('../models/attractions.model')
const areasModel = require('../models/areas.model')

const countTotalPlaygrounds = async (condition) => {
  const totalPlaygrounds = await playgroundsModel.countDocuments(condition)
  return totalPlaygrounds
}

const getAllAttractions = async () => {
  const attractions = await attractionsModel.find()
  return attractions
}

const getAllAreas = async () => {
  const areas = await areasModel.find()
  return areas
}

const getPlaygrounds = async (condition, limit=8, page=1) => {
  const playgrounds = await playgroundsModel.find(condition)
    .skip((page - 1) * limit)
    .limit(limit)
    .then(data => data)
    .catch(err => {
      console.error(err)
      throw new DatabaseError('Something went wrong at getPlaygrounds')
    })
  return playgrounds
}

const getPlaygroundById = async (id) => {
  return await playgroundsModel.findById(id).populate('attractions reviews');
};

module.exports = {
  countTotalPlaygrounds,
  getPlaygrounds,
  getAllAttractions,
  getAllAreas,
  getPlaygroundById,
}
