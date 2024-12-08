const reviewsService = require('../services/review.service');

const getReview = async (req, res) => {
    const review = await reviewsService.getReviewById(req.params.id);
    res.status(200).json(review);
}

const getReviews = async (req, res) => {
    const reviews = await reviewsService.getAllReviews();
    res.status(200).json(reviews);
}

const createReview = async (req, res) => {
    const review = await reviewsService.createReview(req.body);
    res.status(201).json(review);
}
const getReviewsByPlaygroundId = async (req, res) => {
    const reviews = await reviewsService.getReviewsByPlaygroundId(req.query.playgroundId);
    res.status(200).json(reviews);
}
const getReviewsByUserId = async (req, res) => {
    const reviews = await reviewsService.getReviewsByUserId(req.query.userId);
    res.status(200).json(reviews);
}
const getReviewsByRating = async (req, res) => {
    const reviews = await reviewsService.getReviewsByRating(req.query.rating);
    res.status(200).json(reviews);
}

module.exports = {
    getReview,
    getReviews,
    createReview,
    getReviewsByPlaygroundId,
    getReviewsByUserId,
    getReviewsByRating
}