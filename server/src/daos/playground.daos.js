const { DatabaseError } = require('../errors/customError')
const playgroundsModel = require('../models/playgrounds.model')

const countTotalPlaygrounds = async (condition) => {
  const totalPlaygrounds = await playgroundsModel.countDocuments(condition)
  return totalPlaygrounds
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

module.exports = {
  countTotalPlaygrounds,
  getPlaygrounds,
}
