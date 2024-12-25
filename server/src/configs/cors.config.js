const WHITELIST_DOMAIN = [
  'http://localhost:5173',
  'https://lumiroo-phuc-daos-projects.vercel.app',
  'https://lumiroo-phuc-daos-projects.vercel.app/',
]

const corsConfig = {
  origin: function (origin, callback) {
    if (WHITELIST_DOMAIN.includes(origin) !== -1 || !origin) {
      callback(null, true)
    }else
    callback(new Error("Not allowed by CORS"))
  },
  optionsSuccessStatus: 204,
  credentials: true,
}

module.exports = corsConfig