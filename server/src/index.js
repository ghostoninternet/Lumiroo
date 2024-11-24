const express = require('express')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const session = require('express-session');
const corsConfig = require('./configs/cors.config')
const ENV = require('./configs')
const errorHandler = require('./middlewares/errorHandler.middleware')
const connectDatabase = require('./configs/database.config')

connectDatabase()

const app = express()
const PORT = ENV.PORT || 8000

// Middleware cho session
app.use(
  session({
    secret: 'your-secret-key', // Đổi thành một chuỗi bí mật an toàn
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Đặt thành true nếu sử dụng HTTPS
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
