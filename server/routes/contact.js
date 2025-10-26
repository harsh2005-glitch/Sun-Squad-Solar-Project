const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');

// This is a public route, so no 'protect' or 'admin' middleware is needed
router.post('/', submitContactForm);

module.exports = router;