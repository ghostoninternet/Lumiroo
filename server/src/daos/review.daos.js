const { DatabaseError } = require('../errors/customError')
const reviewsModel = require('../models/reviews.model')
const usersModel = require('../models/users.model')
const playgroundsModel = require('../models/playgrounds.model')

const getAllReviews = async () => {
  const reviews = await reviewsModel.find()
  return reviews
}
const getReviewById = async (id) => {
    const review = await reviewsModel.findById(id)
    return review
}
const getReviewsByPlaygroundId = async (playgroundId) => {
    const reviews = await reviewsModel.find({ playgroundId })
    return reviews
}
const getReviewsByUserId = async (userId) => {
    const reviews = await reviewsModel.find({ userId })
    return reviews
}
const getReviewsByRating = async (rating) => {
    const reviews = await reviewsModel
        .find({ rating })
        .populate('userId')
        .populate('playgroundId')
    return reviews
}
module.exports = {
    getAllReviews,
    getReviewById,
    getReviewsByPlaygroundId,
    getReviewsByUserId,
    getReviewsByRating
}