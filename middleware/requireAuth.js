// Middleware to ensure that a user is authenticated before accessing certain routes.
module.exports = function requireAuth(req, res, next) {
    // Check if the user is logged in by verifying the session.
    if (req.session && req.session.user) {
        return next(); // User is authenticated, proceed to the next middleware or route handler.
    }

    // User is not authenticated, redirect to the login page with an error message.
    return res.redirect('/login?error=Please%20login');
};