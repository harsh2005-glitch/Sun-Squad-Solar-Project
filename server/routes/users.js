// Defines /api/users routes 
const express = require('express');
const router = express.Router();
const {
  getDashboardData,
  getDirects,
  getUserProfile,
  updateUserProfile,
  getCommissions,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
// This route is protected. You must have a valid token to access it.
router.get('/dashboard', protect, getDashboardData);
router.get('/directs', protect, getDirects);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/commissions', protect, getCommissions);

module.exports = router;