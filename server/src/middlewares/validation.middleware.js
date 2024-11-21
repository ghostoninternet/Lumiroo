const { BadRequestError } = require('../errors/customError')

const validation = (schema) => {
  return (req, res, next) => {
    const result = schema.validate({ ...req.body })
    if (result.error) {
      next(new BadRequestError())
    }
    next()
  }
}

module.exports = validation
