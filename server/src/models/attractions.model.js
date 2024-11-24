const mongoose = require('mongoose')

const attractionsModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('attractions', attractionsModel)
