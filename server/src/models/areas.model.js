const mongoose = require('mongoose')

const areasModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('areas', areasModel)
