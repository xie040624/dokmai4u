const router = require('express').Router();
const ctrl = require('../controllers/account.controller');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

// API endpoint to get account details by ID
router.get('/api/admin/:id', ctrl.get);

router.get('/', ctrl.root); // Root page for accounts
router.get('/getall', ctrl.getall); // Retrieve all account data
router.get('/add', ctrl.addPage); // Add New Account page
router.get('/update/:id', ctrl.updatePage); // Update Account page
router.get('/delete/:id', ctrl.deletePage); // Delete Confirmation page

router.post('/add', ctrl.add); // Handle new account creation
router.put('/update/:id', ctrl.update); // Handle updating an existing account
router.delete('/delete/:id', ctrl.delete); // Handle deleting an account

module.exports = router;