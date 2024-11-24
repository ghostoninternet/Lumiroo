const express = require('express')
const asyncHandler = require('../middlewares/asyncHandler.middleware')
const uploadController = require('../controllers/upload.controller')
const uploadMiddleware = require('../middlewares/upload.middleware')
const router = express.Router()

router.post('/image', uploadMiddleware.uploadImage.single('image'), asyncHandler(uploadController.uploadImage))

module.exports = router
