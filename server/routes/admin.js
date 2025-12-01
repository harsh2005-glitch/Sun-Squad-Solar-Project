// Defines /api/admin routes 
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, admin } = require('../middleware/authMiddleware');
const { getAllUsers, addDeposit,getDashboardStats, 
    getGenealogyTree , updateUserStatus , addWithdrawal,
    getTransactionHistory ,getUserById ,loginAsUser, resetUserPassword } = require('../controllers/adminController');

const { 
    getAdminGallery, 
    addGalleryItem, 
    deleteGalleryItem 
} = require('../controllers/galleryController');

// --- Import the new announcement controllers ---
const { 
    getAdminAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
} = require('../controllers/announcementController');

// Use the configured upload middleware (Cloudinary) instead of local storage
const upload = require('../middleware/uploadMiddleware');

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
router.put('/users/:id/reset-password', protect, admin, resetUserPassword);

router.route('/gallery')
    .get(protect, admin, getAdminGallery)
    .post(protect, admin, upload.single('galleryImage'), addGalleryItem);

router.route('/gallery/:id')
    .delete(protect, admin, deleteGalleryItem);

// === ANNOUNCEMENT MANAGEMENT ROUTES ===
router.route('/announcements')
    .get(protect, admin, getAdminAnnouncements)
    .post(protect, admin, upload.single('announcementImage'), createAnnouncement);

router.route('/announcements/:id')
    .put(protect, admin, upload.single('announcementImage'), updateAnnouncement)
    .delete(protect, admin, deleteAnnouncement);    

module.exports = router;