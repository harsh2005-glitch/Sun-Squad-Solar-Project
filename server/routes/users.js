// Defines /api/users routes 
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// const upload = require('../middleware/uploadMiddleware');

const upload = multer({ 
    dest: path.join(__dirname, '..', 'uploads') 
});
const {
  getDashboardData,
  getDirects,
  getUserProfile,
  updateUserProfile,
  getCommissions,
  updateUserProfilePicture,
  uploadAadharCard,
  uploadPanCard,
  getPayoutDetails,
  uploadBankDocument,
  getGenealogyTree ,
  changePassword,
  getIncomeChartData,
   getTeamContributionData ,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');
// This route is protected. You must have a valid token to access it.
router.get('/dashboard', protect, getDashboardData);
router.get('/directs', protect, getDirects);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/profile/picture', protect, upload.single('profileImage'), updateUserProfilePicture);
router.get('/commissions', protect, getCommissions);
router.get('/payout-details', protect, getPayoutDetails);
router.put('/profile/bank-document', protect, upload.single('bankDocument'), uploadBankDocument);
router.put('/profile/aadhar-card', protect, upload.single('aadharCard'), uploadAadharCard);
router.put('/profile/pan-card', protect, upload.single('panCard'), uploadPanCard);
router.get('/genealogy', protect, getGenealogyTree);
router.put('/profile/changepassword', protect, changePassword);
router.get('/charts/income', protect, getIncomeChartData);
router.get('/charts/team-contribution', protect, getTeamContributionData);


module.exports = router;