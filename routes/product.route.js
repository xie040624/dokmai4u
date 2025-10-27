const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/product.controller');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.get('/api/product/:id', ctrl.get);

router.get('/', ctrl.root);

router.post('/', ctrl.search);

router.get('/add', ctrl.add);
router.get('/update', ctrl.update);
router.get('/delete', ctrl.delete);

module.exports = router;