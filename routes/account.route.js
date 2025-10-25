const express = require('express');
const accountController = require('../controllers/account.controller');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', accountController.get);
router.get('/search', accountController.searchPage);
router.post('/search', accountController.select);

module.exports = router;