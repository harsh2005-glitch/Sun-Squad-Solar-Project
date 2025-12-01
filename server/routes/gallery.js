const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const os = require('os');

// Import controllers
const { getPublicGallery, getAdminGallery, addGalleryItem, deleteGalleryItem } = require('../controllers/galleryController');
const { protect, admin } = require('../middleware/authMiddleware');

// Configure multer for image uploads (Use /tmp for Vercel/Serverless)
const upload = multer({ dest: os.tmpdir() });

// --- PUBLIC ROUTE ---
router.get('/', getPublicGallery);

// --- ADMIN ROUTES ---
router.route('/admin')
    .get(protect, admin, getAdminGallery)
    .post(protect, admin, upload.single('galleryImage'), addGalleryItem);
    
router.route('/admin/:id')
    .delete(protect, admin, deleteGalleryItem);


module.exports = router;