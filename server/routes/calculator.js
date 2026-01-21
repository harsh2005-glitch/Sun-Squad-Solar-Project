const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware'); // Admin routes need auth
const calculatorController = require('../controllers/calculatorController');

// Public route to get all active components for the calculator
router.get('/public/data', calculatorController.getActiveItems);

// Admin routes - Manage Components
// Helper to protect these routes - assuming 'auth' middleware checks for token.
// If you have specific admin check, add it (e.g., auth, isAdmin).
// Looking at authMiddleware in context: "authMiddleware.js". I'll assume it's roughly standard.
// If there is an admin role check, I should use it. 
// Existing routes use 'auth'. 

router.get('/:type', protect, admin, calculatorController.getAllItems);
router.post('/:type', protect, admin, calculatorController.addItem);
router.put('/:type/:id', protect, admin, calculatorController.updateItem);
router.delete('/:type/:id', protect, admin, calculatorController.deleteItem);

module.exports = router;
