const playgroundsService = require('../services/playground.service')

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
}
