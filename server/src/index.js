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
    secret: ENV.SESSION_SECRET, // Cung cấp giá trị mặc định nếu biến môi trường bị thiếu
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: ENV.MONGO_URI, // URL MongoDB
      dbName: ENV.DB_NAME, // Tên cơ sở dữ liệu
      ttl: 14 * 24 * 60 * 60, // Session tồn tại 14 ngày (mức hợp lý hơn)
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Bật "secure" nếu môi trường là production
      httpOnly: true, // Ngăn truy cập cookie từ JavaScript (tăng bảo mật)
      maxAge: 14 * 24 * 60 * 60 * 1000, // Thời gian sống của cookie (14 ngày)
    },
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
