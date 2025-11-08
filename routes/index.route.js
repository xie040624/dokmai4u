// Required Modules
const express = require('express');
const router = express.Router();
const indexCtrl = require('../controllers/index.controller'); // Controller for handling public pages
const productCtrl = require('../controllers/product.controller');

// Root page
router.get('/', indexCtrl.root);

// Team page
router.get('/team', indexCtrl.team);

// Login page
router.get('/login', indexCtrl.login);

// Search page
router.get('/search', indexCtrl.search);

router.get('/api/getdetail/:id', indexCtrl.get);
router.get('/detail/:id', indexCtrl.detailPage);

router.get('/searchs', productCtrl.search);

// Export the router module
module.exports = router;