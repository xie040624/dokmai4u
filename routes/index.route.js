// Required Modules
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/index.controller'); // Controller for handling public pages

// Root page
router.get('/', ctrl.root);

// Team page
router.get('/team', ctrl.team);

// Login page
router.get('/login', ctrl.login);

// Search page
router.get('/search', ctrl.search);

router.get('/api/getdetail/:id', ctrl.get);
router.get('/detail/:id', ctrl.detailPage);

// Export the router module
module.exports = router;