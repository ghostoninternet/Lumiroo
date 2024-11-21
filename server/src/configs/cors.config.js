const WHITELIST_DOMAIN = [
  'http://localhost:5173'
]

const corsConfig = {
  origin: function (origin, callback) {
    if (WHITELIST_DOMAIN.includes(origin) !== -1 || !origin) {
      callback(null, true)
    }
    callback(new Error("Not allowed by CORS"))
  },
  optionsSuccessStatus: 204,
  credentials: true,
}

module.exports = corsConfig