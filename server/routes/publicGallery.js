const express = require('express');
const router = express.Router();
const { getPublicGallery } = require('../controllers/galleryController');
router.get('/', getPublicGallery);
module.exports = router;