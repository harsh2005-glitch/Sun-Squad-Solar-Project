// Defines /api/admin routes 
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { getAllUsers, addDeposit,getDashboardStats, 
    getGenealogyTree , updateUserStatus , addWithdrawal,
    getTransactionHistory ,getUserById ,loginAsUser   } = require('../controllers/adminController'); 
// We chain the middleware. First 'protect' checks for a valid token,
// then 'admin' checks if the user from that token is an admin.
router.get('/users', protect, admin, getAllUsers);
router.post('/deposits', protect, admin, addDeposit);
router.get('/genealogy', protect, admin, getGenealogyTree);
router.put('/users/:id/status', protect, admin, updateUserStatus);
router.get('/dashboard', protect, admin, getDashboardStats);
router.post('/withdrawals', protect, admin, addWithdrawal);
router.get('/transactions', protect, admin, getTransactionHistory);
router.get('/users/:id', protect, admin, getUserById);
router.post('/impersonate/:id', protect, admin, loginAsUser);

module.exports = router;