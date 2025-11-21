const router = require('express').Router();
const ctrl = require('../controllers/account.controller');
const requireAuth = require('../middleware/requireAuth');

// router.use(requireAuth);

router.get('/get/:id', ctrl.get); // Retrieve an account data by ID
router.get('/getall', ctrl.getall); // Retrieve all account data
router.post('/search', ctrl.search); // Search accounts by criteria
router.post('/add', ctrl.add); // Create a new account
router.put('/update/:id', ctrl.update); // Update an existing account
router.delete('/delete/:id', ctrl.delete); // Delete an account

module.exports = router;