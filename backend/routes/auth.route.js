const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');

// Handles user login (verifying credentials and creating session)
router.post('/login', ctrl.login);

// Handles user logout (destroying session)
router.post('/logout', ctrl.logout);

module.exports = router;