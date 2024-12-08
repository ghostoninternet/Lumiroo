
const express = require('express')
const asyncHandler = require('../middlewares/asyncHandler.middleware')
const validation = require('../middlewares/validation.middleware')
const reviewValidationSchema = require('../validation/review.validation')
const reviewController = require('../controllers/review.controller')
const authMiddleware = require('../middlewares/authencation.middleware')

const router = express.Router()

router.get('/', authMiddleware,asyncHandler(reviewController.getReviews))
router.get('/:id',authMiddleware, asyncHandler(reviewController.getReview))
router.get('/playground/:id',authMiddleware, asyncHandler(reviewController.getReviewsByPlaygroundId))
router.post('/', authMiddleware, validation.validationBody(reviewValidationSchema.getReviews), asyncHandler(reviewController.createReview))

module.exports = router
