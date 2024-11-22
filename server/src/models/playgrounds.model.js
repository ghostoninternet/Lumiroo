const mongoose = require('mongoose')

const playgroundsModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admissionFee: {
    type: Number,
    required: true,
  },
  address: {
    type: Number,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  attraction: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'reviews',
  },
  ratingAvg: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('playgrounds', playgroundsModel)
