const router = require('express').Router();
const ctrl = require('../controllers/product.controller');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

// API to get a single product by ID
router.get('/api/product/:id', ctrl.getOne);

router.get('/', ctrl.root);
router.get('/getall', ctrl.getAll);
router.get('/add', ctrl.addPage);
router.get('/update/:id', ctrl.updatePage);
router.get('/delete/:id', ctrl.deletePage);

router.post('/add', ctrl.add); // Create a new product

router.put('/update/:id', ctrl.update); // Update an existing product

router.delete('/delete/:id', ctrl.delete); // Delete a product

module.exports = router;