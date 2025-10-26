const GalleryItem = require('../models/galleryItem');
const cloudinary = require('cloudinary').v2;

// === PUBLIC CONTROLLER ===
// @desc    Get all gallery items for the public page
// @route   GET /api/gallery
// @access  Public
const getPublicGallery = async (req, res) => {
    try {
        const items = await GalleryItem.find().sort({ createdAt: -1 }); // Newest first
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// === ADMIN CONTROLLERS ===
// @desc    Get all gallery items for the admin panel
// @route   GET /api/admin/gallery
// @access  Admin
const getAdminGallery = async (req, res) => {
    try {
        const items = await GalleryItem.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Upload a new gallery item
// @route   POST /api/admin/gallery
// @access  Admin
const addGalleryItem = async (req, res) => {
    const { category, title } = req.body;
    
    if (!req.file || !category) {
        return res.status(400).json({ message: 'Image file and category are required.' });
    }

    try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'gallery' });

        const newItem = new GalleryItem({
            imageUrl: result.secure_url,
            category,
            title,
        });

        await newItem.save();
        res.status(201).json(newItem);

    } catch (error) {
        console.error("GALLERY UPLOAD ERROR:", error);
        res.status(500).json({ message: 'Server error during upload.' });
    }
};

// @desc    Delete a gallery item
// @route   DELETE /api/admin/gallery/:id
// @access  Admin
const deleteGalleryItem = async (req, res) => {
    try {
        const item = await GalleryItem.findById(req.params.id);
        if (!item) {
            return res.status(444).json({ message: 'Gallery item not found.' });
        }

        // Optional: Delete from Cloudinary (this part is good practice)
        try {
            // Extract the public_id from the full Cloudinary URL
            const publicIdWithFolder = "gallery/" + item.imageUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicIdWithFolder);
        } catch (cloudinaryError) {
            // Log the error but don't stop the process. We still want to delete from our DB.
            console.error("Cloudinary delete error:", cloudinaryError);
        }

        // --- THIS IS THE FIX ---
        // Use deleteOne() with the ID to remove the document from the database.
        await GalleryItem.deleteOne({ _id: req.params.id });

        res.json({ message: 'Gallery item removed successfully.' });

    } catch (error) {
        console.error("DELETE GALLERY ITEM ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = {
    getPublicGallery,
    getAdminGallery,
    addGalleryItem,
    deleteGalleryItem,
};