const mongoose = require('mongoose')
const { GENDER, ROLE } = require('../constants/model')

const usersModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: [GENDER.MALE, GENDER.FEMALE, GENDER.OTHER],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [ROLE.ADMIN, ROLE.USER],
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  favoritePlayground: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'playgrounds',
  },
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'reviews',
  },  
  address: {
    type: String
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('users', usersModel)
