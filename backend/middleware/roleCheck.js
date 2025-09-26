// middleware/roleCheck.js

function roleCheck(...allowedRoles) {
  return (req, res, next) => {
    // Ensure that req.user and req.user.roles exist (set by your auth middleware)
    if (!req.user || !req.user.role) {
      return res.status(401).json({ error: 'Unauthorized: No user roles found' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    // User has required role, proceed to next middleware/handler
    next();
  };
}

module.exports = roleCheck;
