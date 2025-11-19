const router = require('express').Router();
const indexCtrl = require('../controllers/index.controller');
const productCtrl = require('../controllers/product.controller');

router.get('/detail/:id', indexCtrl.get);
router.get('/search', productCtrl.search);

module.exports = router;