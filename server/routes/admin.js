// Defines /api/admin routes 
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { getAllUsers, addDeposit,getDashboardStats } = require('../controllers/adminController'); 
// We chain the middleware. First 'protect' checks for a valid token,
// then 'admin' checks if the user from that token is an admin.
router.get('/users', protect, admin, getAllUsers);
router.post('/deposits', protect, admin, addDeposit);
router.get('/dashboard', protect, admin, getDashboardStats);
module.exports = router;