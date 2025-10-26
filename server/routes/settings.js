const express = require('express');
const router = express.Router();
const { getSettings, updateSettings , updateNotice } = require('../controllers/settingsController');
const { protect, admin } = require('../middleware/authMiddleware');

// Both routes are protected and require admin access
router.route('/')
    .get(protect, admin, getSettings)
    .put(protect, admin, updateSettings);
    router.put('/notice', protect, admin, updateNotice);

module.exports = router;