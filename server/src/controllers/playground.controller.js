const playgroundsService = require('../services/playground.service')

const filterPlayground = async (req, res, next) => {
  const playgrounds = await playgroundsService.filterPlayground(req.query)
  res.status(200).json(playgrounds)
}

module.exports = {
  filterPlayground
}
