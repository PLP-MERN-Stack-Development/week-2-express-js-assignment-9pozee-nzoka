// middleware/Product.js - an authentication middleware that checks for an API key in the request headers
const { body, validationResult } = require('express-validator');

const productValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
  return res.status(400).json({ errors: extractedErrors });
};

module.exports = { productValidationRules, validate };
