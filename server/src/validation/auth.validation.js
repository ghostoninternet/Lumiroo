const Joi = require('joi')

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

module.exports = {
  signInSchema,
  signUpSchema,
}
