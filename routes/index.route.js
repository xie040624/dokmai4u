const router = require('express').Router();
const indexCtrl = require('../controllers/index.controller');
const productCtrl = require('../controllers/product.controller');

// Home page
router.get('/', indexCtrl.root);

// Team page
router.get('/team', indexCtrl.team);

// Login page
router.get('/login', indexCtrl.login);

// Search page
router.get('/search', indexCtrl.search);

// API to get detail of a product
router.get('/api/getdetail/:id', indexCtrl.get);

// Detail page for a product
router.get('/detail/:id', indexCtrl.detailPage);

// Search functionality
router.get('/searchs', productCtrl.search);

module.exports = router;