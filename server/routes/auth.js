// Defines /api/auth routes 
const express = require('express');
const router = express.Router();
const { signupUser, loginUser, completeOnboarding,  forgotPassword, 
  resetPassword ,resetPasswordWithFirebase} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', signupUser);
router.post('/login', loginUser);
// router.post('/forgotpassword', forgotPassword); 
// router.put('/resetpassword/:token', resetPassword); 
// Protected route - you must be logged in to access this
router.post('/complete-onboarding', protect, completeOnboarding);
// router.put('/resetpassword-firebase', resetPasswordWithFirebase);
module.exports = router;