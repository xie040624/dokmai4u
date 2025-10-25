const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.controller');

router.get('/', indexController.root);
router.get('/team', indexController.team);
router.get('/login', indexController.login);
router.get('/search', indexController.search);

module.exports = router;