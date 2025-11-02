const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/product.controller');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.get('/api/product/:id', ctrl.getOne);

router.get('/', ctrl.root);
router.get('/getall', ctrl.getAll);
router.get('/add', ctrl.addPage);
router.get('/update/:id', ctrl.updatePage);
router.get('/delete/:id', ctrl.deletePage);
router.get('/search', ctrl.search);

router.post('/add', ctrl.add);

router.put('/update/:id', ctrl.update);

router.delete('/delete/:id', ctrl.delete);

module.exports = router;