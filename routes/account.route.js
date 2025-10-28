// Required Modules
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/account.controller'); // Account management Controller
const requireAuth = require('../middleware/requireAuth'); // Authentication Middleware

// Apply 'requireAuth' to all routes below to enforce login/authentication
router.use(requireAuth);

// Retrieve specific admin information by AdminID
router.get('/api/admin/:id', ctrl.get);

router.get('/', ctrl.root); // Root page for accounts
router.get('/getall', ctrl.getall); // Retrieve all account data
router.get('/add', ctrl.addPage); // Add New Account page
router.get('/update/:id', ctrl.updatePage); // Update Account page
router.get('/delete/:id', ctrl.deletePage); // Delete Confirmation page

router.post('/add', ctrl.add); // Handle new account creation
router.put('/update/:id', ctrl.update); // Handle updating an existing account
router.delete('/delete/:id', ctrl.delete); // Handle deleting an account

// Export the router for use in the main server file
module.exports = router;