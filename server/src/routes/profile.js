const express = require('express')
const asyncHandler = require('../middlewares/asyncHandler.middleware')
const validation = require('../middlewares/validation.middleware')
const profileValidationSchema = require('../validation/profile.validation')
const profileController = require('../controllers/profile.controller')
const authMiddleware = require('../middlewares/authencation.middleware')
   
const router = express.Router()
router.get('/profile', authMiddleware,asyncHandler(profileController.getProfile))
router.put('/profile', authMiddleware,validation.validationBody(profileValidationSchema.updateProfile), asyncHandler(profileController.updateProfile))
module.exports = router
