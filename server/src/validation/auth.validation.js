const Joi = require('joi');

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').required(),
  phoneNumber: Joi.string().required(),
  dob: Joi.date().required(),
  avatarUrl: Joi.string().uri().required(),
});

module.exports = {
  signInSchema,
  signUpSchema,
};