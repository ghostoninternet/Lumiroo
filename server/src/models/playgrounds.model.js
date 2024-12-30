const mongoose = require("mongoose");

const playgroundsModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    admissionFee: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    attractions: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: "attractions",
    },
    openingTime: {
      type: Number,
      required: true,
    },
    closingTime: {
      type: Number,
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
      ref: "reviews",
    },
    ratingAvg: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

playgroundsModel.index({ admissionFee: 1 });
playgroundsModel.index({ openingTime: 1 });
playgroundsModel.index({ closingTime: 1 });
playgroundsModel.index({ area: 1 });
playgroundsModel.index({ attractions: 1 });

module.exports = mongoose.model("playgrounds", playgroundsModel);
