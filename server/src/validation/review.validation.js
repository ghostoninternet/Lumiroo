
const Joi = require('joi');
const getReviews = Joi.object({
    limit: Joi.number().min(1).required(),
    page: Joi.number().min(1).required(),
  })
module.exports = {
    getReviews,
}