const express = require('express');
const multer = require('multer');
const os = require('os');
const router = express.Router();

const { getAllTeamMembers, addTeamMember, deleteTeamMember } = require('../controllers/teamController');
const { protect, admin } = require('../middleware/authMiddleware');

// Use local temp directory for uploads (compatible with Vercel/serverless/Cloudinary)
const upload = multer({ dest: os.tmpdir() });

router.get('/', getAllTeamMembers);
router.post('/', protect, admin, upload.single('image'), addTeamMember);
router.delete('/:id', protect, admin, deleteTeamMember);

module.exports = router;
