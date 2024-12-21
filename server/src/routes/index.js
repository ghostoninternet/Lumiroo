const express = require('express')
const router = express.Router()

router.use('/auth', require('./auth'))
router.use('/playgrounds', require('./playground'))
router.use('/uploads', require('./upload'))
router.use('/users', require('./profile'))
router.use('/admin', require('./admin'))
module.exports = router
