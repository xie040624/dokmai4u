const router = require('express').Router();
const ctrl = require('../controllers/product.controller');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

// API to get a single product by ID
router.get('/api/product/:id', ctrl.getOne);

router.get('/', ctrl.root); // Root page for products
router.get('/getall', ctrl.getAll); // Retrieve all products data
router.get('/add', ctrl.addPage); // Page to add a new product
router.get('/update/:id', ctrl.updatePage); // Page to update a product
router.get('/delete/:id', ctrl.deletePage); // Page to delete a product

router.post('/search2', ctrl.search2); // Search products by criteria

router.post('/add', ctrl.add); // Create a new product

router.put('/update/:id', ctrl.update); // Update an existing product

router.delete('/delete/:id', ctrl.delete); // Delete a product

module.exports = router;