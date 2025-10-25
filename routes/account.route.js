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
router.get('/update/:id', accountController.updatePage);

module.exports = router;