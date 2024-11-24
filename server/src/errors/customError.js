const ErrorMessages = require('./errorMessages.js')
const ErrorCodes = require('./errorCodes.js')

/**
 * For error, we would like to see the followings information
 * 1. The correct HTTP Status Code
 * 2. The error message
 * 3. The error name
 * 4. The error stack
 */

class CustomError extends Error {
  constructor(message, statusCode, name) {
    super(message)
    this.statusCode = statusCode
    this.name = name || "CustomError"
  }
}

class BadRequestError extends CustomError {
  constructor(message=ErrorMessages.BAD_REQUEST, statusCode=ErrorCodes.BAD_REQUEST, name="BadRequestError") {
    super(message, statusCode, name)
  }
}

class UnauthorizedError extends CustomError {
  constructor(message=ErrorMessages.UNAUTHORIZED, statusCode=ErrorCodes.UNAUTHORIZED, name="UnauthorizedError") {
    super(message, statusCode, name)
  }
}

class NotFoundError extends CustomError {
  constructor(message=ErrorMessages.NOT_FOUND, statusCode=ErrorCodes.NOT_FOUND, name="NotFoundError") {
    super(message, statusCode, name)
  }
}

class InternalServerError extends CustomError {
  constructor(message=ErrorMessages.INTERNAL_SERVER_ERROR, statusCode=ErrorCodes.INTERNAL_SERVER_ERROR, name="InternalServerError") {
    super(message, statusCode, name)
  }
}

class UserAlreadyExistError extends BadRequestError {
  constructor(message="User already exist!", statusCode=ErrorCodes.BAD_REQUEST, name="UserAlreadyExistError") {
    super(message, statusCode, name)
  }
}

class DatabaseError extends  CustomError {
  constructor(message="Something wrong with Database", statusCode=ErrorCodes.INTERNAL_SERVER_ERROR, name="DatabaseError") {
    super(message, statusCode, name)
  }
}

module.exports = {
  CustomError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
  DatabaseError,
  UserAlreadyExistError
}
