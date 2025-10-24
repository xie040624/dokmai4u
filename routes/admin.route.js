const express = require('express');
const adminController = require('./../controllers/admin.controller');

const router = express.Router();

router.get('/users', adminController.get);
router.post('/', adminController.insert);
router.put('/:id', adminController.update);
router.delete('/:id', adminController.delete);

module.exports = router;