// Defines /api/users routes 
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const {
  getDashboardData,
  getDirects,
  getUserProfile,
  updateUserProfile,
  getCommissions,
  updateUserProfilePicture,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
// This route is protected. You must have a valid token to access it.
router.get('/dashboard', protect, getDashboardData);
router.get('/directs', protect, getDirects);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/profile/picture', protect, upload.single('profileImage'), updateUserProfilePicture);
router.get('/commissions', protect, getCommissions);

module.exports = router;