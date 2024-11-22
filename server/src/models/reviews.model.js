const mongoose = require('mongoose')

const reviewsModel = new mongoose.Schema({
  playgroundId: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'playgrounds',
  },
  userId: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'users',
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('reviews', reviewsModel)
