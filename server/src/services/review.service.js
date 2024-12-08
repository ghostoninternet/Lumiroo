const reviewsDao = require('../daos/review.daos');


const getAllReviews = async () => {
    return await reviewsDao.getAllReviews();
    }

const getReviewById = async (id) => {
    return await reviewsDao.getReviewById(id);
}

const getReviewsByPlaygroundId = async (playgroundId) => {
    return await reviewsDao.getReviewsByPlaygroundId(playgroundId);
}

const getReviewsByUserId = async (userId) => {
    return await reviewsDao.getReviewsByUserId(userId);
}

const getReviewsByRating = async (rating) => {
    return await reviewsDao.getReviewsByRating(rating);
}

module.exports = {
    getAllReviews,
    getReviewById,
    getReviewsByPlaygroundId,
    getReviewsByUserId,
    getReviewsByRating
}