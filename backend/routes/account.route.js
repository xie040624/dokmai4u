const router = require('express').Router();
const ctrl = require('../controllers/account.controller');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

// API endpoint to get account details by ID
router.get('/get/:id', ctrl.get);
router.get('/getall', ctrl.getall); // Retrieve all account data

router.post('/search', ctrl.search); // Handle searching for accounts
router.post('/add', ctrl.add); // Handle new account creation

router.put('/update/:id', ctrl.update); // Handle updating an existing account

router.delete('/delete/:id', ctrl.delete); // Handle deleting an account



module.exports = router;