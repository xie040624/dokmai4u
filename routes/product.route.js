const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/product.controller');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.get('/api/product/:id', ctrl.get);

router.get('/', ctrl.root);
router.get('/getall', ctrl.getall);
router.get('/add', ctrl.addPage);
router.get('/update/:id', ctrl.updatePage);
router.get('/delete/:id', ctrl.deletePage);

router.put('/update/:id', ctrl.update);

router.delete('/delete/:id', ctrl.delete); // Handle deleting an product

module.exports = router;