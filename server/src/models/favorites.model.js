const mongoose = require('mongoose');

const favoritesModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  playgrounds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'playgrounds',
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('favorites', favoritesModel);
