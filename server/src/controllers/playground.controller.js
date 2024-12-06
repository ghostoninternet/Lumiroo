const playgroundsService = require('../services/playground.service')
const playgroundsDaos = require('../daos/playground.daos')

const getAttractions = async (req, res, next) => {
  const attractions = await playgroundsDaos.getAllAttractions()
  res.status(200).json(attractions)
}

const getAllAreas = async (req, res, next) => {
  const areas = await playgroundsDaos.getAllAreas()
  res.status(200).json(areas)
}

const getPlayground = async (req, res, next) => {
  const playgrounds = await playgroundsService.getPlayground(req.query)
  res.status(200).json(playgrounds)
}

const filterPlayground = async (req, res, next) => {
  const playgrounds = await playgroundsService.filterPlayground(req.query)
  res.status(200).json(playgrounds)
}

module.exports = {
  getPlayground,
  filterPlayground,
  getAttractions,
  getAllAreas,
}
