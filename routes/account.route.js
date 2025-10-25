const express = require('express');
const accountController = require('../controllers/account.controller');

const router = express.Router();

router.get('/', accountController.root);

module.exports = router;