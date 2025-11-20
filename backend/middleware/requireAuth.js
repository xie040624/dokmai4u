// Middleware to ensure that a user is authenticated before accessing certain routes.
module.exports = function requireAuth(req, res, next) {
    // Check if the user is logged in by verifying the session.
    if (req.session && req.session.user) return next();
    
    return res.status(401).json({ message: 'Unauthorized' });
};