const mongoose = require('mongoose')
const { EXPIRES_IN } = require('../constants/model')

const sessionsModel = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + EXPIRES_IN),
    expires: EXPIRES_IN / 1000,
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('sessions', sessionsModel)
