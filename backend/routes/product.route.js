const router = require('express').Router();
const ctrl = require('../controllers/product.controller');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.get('/get/:id', ctrl.getone);// Retrieve a single product data by ID
router.get('/getall', ctrl.getall); // Retrieve all products data

router.post('/search', ctrl.searchs); // Search products by criteria
router.post('/add', ctrl.add); // Create a new product

router.put('/update/:id', ctrl.update); // Update an existing product

router.delete('/delete/:id', ctrl.delete); // Delete a product

module.exports = router;