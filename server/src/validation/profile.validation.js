const { GENDER } = require('../constants/model');
const Joi = require('joi');

const updateProfile = Joi.object({
  username: Joi.string().required(),
  address: Joi.string().optional(),
  gender: Joi.string().valid(GENDER.MALE, GENDER.FEMALE, GENDER.OTHER).required(),
  phoneNumber: Joi.string().required(),
  dob: Joi.date().required(),
  avatarUrl: Joi.string().allow(null, '').optional(),
});

module.exports = {
  updateProfile,
};
