const express = require('express');
const router = express.Router();
const { 
    submitContactForm, 
    getInquiries, 
    updateInquiryStatus, 
    deleteInquiry 
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public: Submit form
router.post('/', submitContactForm);

// Admin: Manage inquiries
router.get('/', protect, admin, getInquiries);
router.put('/:id', protect, admin, updateInquiryStatus);
router.delete('/:id', protect, admin, deleteInquiry);

module.exports = router;