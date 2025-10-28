// Required Modules
const router = require('express').Router();
const authController = require('../controllers/auth.controller'); // Controller for handling user authentication logic

// Handles the user login attempt (submitting credentials)
router.post('/login', authController.login);

// Handles user logout (clearing session and redirecting)
router.post('/logout', (req, res) => {
    // 1. Destroy the current session data on the server
    req.session?.destroy(() => {
        // 2. Clear the session ID cookie from the browser
        res.clearCookie('connect.sid');
        // 3. Redirect the user to the login page after successful logout
        res.redirect('/login');
    });
});

// Export the router module
module.exports = router;