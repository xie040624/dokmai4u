const express = require('express');
const accountController = require('../controllers/account.controller');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', accountController.get);
router.get('/search', accountController.searchPage);
router.post('/search', accountController.search);
router.get('/add', accountController.addPage);
router.post('/add', accountController.add);
router.get('/delete/:id', accountController.deletePage);

// แสดงหน้า
router.get('/update/:id', accountController.updatePage);

// API สำหรับหน้า update นี้
router.get('/api/admin/:id', accountController.getOne);
router.post('/update/:id', accountController.update);

module.exports = router;