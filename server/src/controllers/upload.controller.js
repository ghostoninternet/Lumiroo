const uploadService = require('../services/upload.service')

const uploadImage = async (req, res, next) => {
  const result = await uploadService.uploadImage(req.file)
  res.status(200).json({
    data: result,
  })
}

module.exports = {
  uploadImage,
}
