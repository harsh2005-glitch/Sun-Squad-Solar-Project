// Defines /api/auth routes 
const express = require('express');
const router = express.Router();
const { signupUser, loginUser, completeOnboarding,  forgotPassword, 
  resetPassword, setNewPassword, requestPasswordReset } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/request-password-reset', requestPasswordReset); // <-- New Route
// router.post('/forgotpassword', forgotPassword); 
// router.put('/resetpassword/:token', resetPassword); 
// Protected route - you must be logged in to access this
router.post('/complete-onboarding', protect, completeOnboarding);
router.put('/set-new-password', protect, setNewPassword);

module.exports = router;