// Checks if the user is logged in before allowing access to the next route.
module.exports = function requireAuth(req, res, next) {
    // Check if a session exists AND if the session contains user data (meaning the user is logged in).
    if (req.session && req.session.user) {
        return next(); // If logged in, proceed to the next route.
    }

    // If not, redirect the user to the login page with an error message.
    return res.redirect('/login?error=Please%20login');
};