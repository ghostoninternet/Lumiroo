const multer = require("multer")

const storageImages = multer.diskStorage({
  destination: "./assets/images",
})

const uploadImage = multer({ storage: storageImages })

module.exports = {
  uploadImage,
}
