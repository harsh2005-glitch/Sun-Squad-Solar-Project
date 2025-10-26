const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true }, // The URL from Cloudinary
    category: {
        type: String,
        enum: ['residential', 'commercial', 'industrial'], // The allowed categories
        required: true
    },
    title: { type: String }, // An optional title or description for the image
}, { timestamps: true });

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);
module.exports = GalleryItem;