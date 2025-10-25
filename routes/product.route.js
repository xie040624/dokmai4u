const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.use(requireAuth);

router.get('/', productController.get);
router.get('/add', productController.add);
router.get('/update', productController.update);
router.get('/delete', productController.delete);

module.exports = router;