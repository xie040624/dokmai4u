const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', productController.root);
router.get('/add', productController.add);
router.get('/update', productController.update);
router.get('/delete', productController.delete);

module.exports = router;