const Joi = require('joi');
const { GENDER } = require('../constants/model');

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  gender: Joi.string()
    .valid(GENDER.MALE, GENDER.FEMALE, GENDER.OTHER)
    .required(),
  phoneNumber: Joi.string().required(),
  dob: Joi.date().required(),
});

module.exports = {
  signInSchema,
  signUpSchema,
};