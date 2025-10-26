const Announcement = require('../models/announcement');
const cloudinary = require('cloudinary').v2;

// === PUBLIC CONTROLLER ===
// @desc    Get all announcements for the public page
const getPublicAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// === ADMIN CONTROLLERS ===
// @desc    Create a new announcement
const createAnnouncement = async (req, res) => {
    const { title, content } = req.body;
    let imageUrl = '';

    try {
        // Check if an image file was included in the upload
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'announcements' });
            imageUrl = result.secure_url;
        }

        const announcement = await Announcement.create({
            title,
            content,
            imageUrl,
        });

        res.status(201).json(announcement);
    } catch (error) {
        console.error("CREATE ANNOUNCEMENT ERROR:", error);
        res.status(500).json({ message: 'Server error during creation.' });
    }
};

// @desc    Get all announcements for the admin panel
const getAdminAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update an announcement
const updateAnnouncement = async (req, res) => {
    const { title, content } = req.body;
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found.' });
        }
        
        announcement.title = title || announcement.title;
        announcement.content = content || announcement.content;

        // Optional: Handle image update if a new file is sent
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'announcements' });
            announcement.imageUrl = result.secure_url;
        }

        const updatedAnnouncement = await announcement.save();
        res.json(updatedAnnouncement);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete an announcement
const deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found.' });
        }

        // Optional but good practice: Delete image from Cloudinary if it exists
        if (announcement.imageUrl) {
            try {
                const publicIdWithFolder = "announcements/" + announcement.imageUrl.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicIdWithFolder);
            } catch (cloudinaryError) {
                console.error("Cloudinary delete error (announcement):", cloudinaryError);
            }
        }

        // --- THIS IS THE FIX ---
        // Use the static deleteOne method on the model
        await Announcement.deleteOne({ _id: req.params.id });

        res.json({ message: 'Announcement removed successfully.' });

    } catch (error) {
        console.error("DELETE ANNOUNCEMENT ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getPublicAnnouncements,
    createAnnouncement,
    getAdminAnnouncements,
    updateAnnouncement,
    deleteAnnouncement,
};