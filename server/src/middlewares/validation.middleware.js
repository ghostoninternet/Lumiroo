const { BadRequestError } = require('../errors/customError')

const validationBody = (schema) => {
  return (req, res, next) => {
    const result = schema.validate({ ...req.body })
    if (result.error) {
      next(new BadRequestError(result.error.message))
    }
    next()
  }
}

const validationQuery = (schema) => {
  return (req, res, next) => {
    if (req.query?.attractions) {
      if (typeof req.query.attractions == 'string') {
        req.query.attractions = [req.query.attractions]
      }
    }
    const result = schema.validate({ ...req.query })
    if (result.error) {
      next(new BadRequestError(result.error.message))
    }
    next()
  }
}

module.exports = {
  validationBody,
  validationQuery
}
