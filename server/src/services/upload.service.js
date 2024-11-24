const { v2: cloudinary } = require('cloudinary')
const ENV = require('../configs/')
const { InternalServerError } = require('../errors/customError')

cloudinary.config({
  cloud_name: ENV.CLOUD_NAME,
  api_key: ENV.API_KEY,
  api_secret: ENV.API_SECRET,
})

const uploadImage = async (file) => {
  const multerPath = file.path
  const transformedPath = multerPath.replaceAll("\\", "/")

  try {
    const result = await cloudinary.uploader.upload(transformedPath)

    return result.url

  } catch (error) {
    throw new InternalServerError("Something went wrong when uploading file")
  }
}

module.exports = {
  uploadImage,
}
