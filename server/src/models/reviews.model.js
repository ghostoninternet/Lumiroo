const mongoose = require('mongoose')

const reviewsModel = new mongoose.Schema({
  playgroundId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'playgrounds',
    required: true, 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users', 
    required: true, 
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
