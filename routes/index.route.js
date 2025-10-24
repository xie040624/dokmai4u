const express = require('express');
const indexController = require('./../controllers/index.controller');

const router = express.Router();

router.get('/', indexController.get);
router.post('/', indexController.post);
router.put('/', indexController.put);
router.delete('/', indexController.delete);

module.exports = router;