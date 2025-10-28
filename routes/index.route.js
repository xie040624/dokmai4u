// Required Modules
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.controller'); // Controller for handling public pages

// Root page
router.get('/', indexController.root);

// Team page
router.get('/team', indexController.team);

// Login page
router.get('/login', indexController.login);

// Search page
router.get('/search', indexController.search);

// Export the router module
module.exports = router;