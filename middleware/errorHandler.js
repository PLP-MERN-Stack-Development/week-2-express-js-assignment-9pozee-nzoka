// middleware/errorHandler.js
const { CustomError } = require('../errors/CustomError');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // For unhandled errors
  res.status(500).json({ message: 'Something went wrong!' });
};

module.exports = errorHandler;
