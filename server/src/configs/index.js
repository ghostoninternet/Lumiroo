require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  DB_NAME: process.env.DB_NAME,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  APP_EMAIL: process.env.APP_EMAIL,
  APP_PASSWORD: process.env.APP_PASSWORD,
}