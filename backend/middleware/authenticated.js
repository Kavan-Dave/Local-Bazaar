// middleware/auth.js

const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'AT_LOCAL'; // Use env var in production

function authenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Expected format: "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Malformed token' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Attach user info (e.g. userId, roles) to the request
    console.log(req.user);
    next(); // Proceed to next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = authenticated;
