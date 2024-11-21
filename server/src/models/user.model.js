const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // phoneNumber: {
  //   type: String,
  //   required: true,
  // },
  // dob: {
  //   type: Date,
  //   required: true,
  // },
  // gender: {
  //   type: String,
  //   enum: ['male', 'female'],
  //   required: true,
  // },
  // avatarUrl: {
  //   type: String,
  //   required: true,
  // },
}, {
  timestamps: true
})

module.exports = mongoose.model('users', userModel)
