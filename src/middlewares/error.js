const logger = require("../config/logger");
const ApiError = require("../utils/apiError");

function notFoundHandler(req, res, next) {
  next(new ApiError(404, 'Route not found'));
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  logger.error(err.message, err);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.errors || null,
  });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};