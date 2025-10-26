const express = require('express');
const router = express.Router();
const { getPublicAnnouncements } = require('../controllers/announcementController');

router.get('/', getPublicAnnouncements);

module.exports = router;