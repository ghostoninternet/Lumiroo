const Joi = require('joi')

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  gender: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  dob: Joi.date().required(),
  avatarUrl: Joi.string().required(),
  role: Joi.string().required(),
})

module.exports = {
  signInSchema,
  signUpSchema,
}
