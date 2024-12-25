const express = require('express')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const corsConfig = require('./configs/cors.config')
const ENV = require('./configs')
const errorHandler = require('./middlewares/errorHandler.middleware')
const connectDatabase = require('./configs/database.config')

connectDatabase()

const app = express()
const PORT = ENV.PORT || 8000

app.use(cors(corsConfig))
app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/ping', (req, res, next) => {
  res.status(200).json({
    message: "OK"
  })
})
app.use('/api', require('./routes'))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server starting at http://localhost:${PORT}`)
})
