const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/account.controller');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.get('/api/admin/:id', ctrl.get);

router.get('/', ctrl.root);
router.get('/search', ctrl.searchPage);
router.get('/add', ctrl.addPage);
router.get('/update/:id', ctrl.updatePage);
router.get('/delete/:id', ctrl.deletePage);

router.post('/search', ctrl.search);
router.post('/add', ctrl.add);
router.post('/update/:id', ctrl.update);

router.delete('/delete/:id', ctrl.delete);

module.exports = router;