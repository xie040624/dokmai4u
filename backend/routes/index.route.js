const router = require('express').Router();
const indexCtrl = require('../controllers/index.controller');
const productCtrl = require('../controllers/product.controller');

// Retrieve a product data by ID for detail page
router.get('/detail/:id', indexCtrl.get);

// Search products by criteria
router.post('/search', productCtrl.searchs);

module.exports = router;