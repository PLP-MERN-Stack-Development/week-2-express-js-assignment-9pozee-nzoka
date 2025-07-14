// middleware/auth.js
const auth = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  const validKey = 'your-secret-api-key';

  if (!apiKey || apiKey !== validKey) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API key' });
  }

  next();
};

module.exports = auth;
