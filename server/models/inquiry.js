const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
        required: true
    },
    source: {
        type: String, // 'Contact Form', 'Get Quote', 'WhatsApp', etc.
        default: 'Website'
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Closed', 'Spam'],
        default: 'New'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
