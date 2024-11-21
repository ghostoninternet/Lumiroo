const mongoose = require('mongoose')
const ENV = require('./index')

const connectDatabase = async () => {
  await mongoose.connect(ENV.MONGO_URI, {
    dbName: ENV.DB_NAME
  }).then(() => {
    console.log("Connected to MongoDB")
  }).catch((err) => {
    console.error("Error in connecting to MongoDB")
    process.exit(1)
  })
}

module.exports = connectDatabase
