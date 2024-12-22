const { UnauthorizedError } = require("../errors/customError")

const roleHandler = (roles) => {
  return (req, res, next) => {
    const userRole = req.session.user.role
    if (roles.includes(userRole)) {
      next()
    }
    else throw new UnauthorizedError("You don't have permission to access this route!")
  }
}

module.exports = roleHandler
