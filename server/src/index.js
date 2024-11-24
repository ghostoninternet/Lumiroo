const express = require('express')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const MongoStore = require('connect-mongo');
const session = require('express-session');

const corsConfig = require('./configs/cors.config')
const ENV = require('./configs')
const errorHandler = require('./middlewares/errorHandler.middleware')
const connectDatabase = require('./configs/database.config')

connectDatabase()

const app = express()
const PORT = ENV.PORT || 8000

app.use(
  session({
    secret: ENV.SESSION_SECRET, // Secret từ biến môi trường
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: ENV.MONGO_URI, // URL MongoDB từ file .env
      dbName: ENV.DB_NAME, // Tên cơ sở dữ liệu từ file .env
      ttl: 14 * 24 * 60 * 60, // Session tồn tại 14 ngày
    }),
    cookie: { secure: false },  // True if https
  })
);

app.use(cors(corsConfig))
app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./routes'))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server starting at http://localhost:${PORT}`)
})
