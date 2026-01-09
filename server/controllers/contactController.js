const { Resend } = require('resend');
const Inquiry = require('../models/inquiry');

// @desc    Handle contact form submission
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
    const { name, email, subject, message, phone, source } = req.body;

    // Basic validation
    if (!name || !email || !message) { // Phone/Subject might be optional depending on form
        return res.status(400).json({ message: 'Please fill out all required fields (Name, Email, Message).' });
    }

    try {
        // 1. Save to Database
        const newInquiry = await Inquiry.create({
            name,
            email,
            phone: phone || '', // Optional
            subject: subject || 'New Inquiry',
            message,
            source: source || 'Website Contact Form'
        });

        // 2. Send Email Notification
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>', // From Resend's default
            to: 'sunsquadsolar4@gmail.com', // <-- YOUR EMAIL ADDRESS
            subject: `New Inquiry from ${name}: ${subject || 'No Subject'}`,
            reply_to: email, 
            html: `
                <h1>New Inquiry from your Website</h1>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Source:</strong> ${source || 'Website'}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <br>
                <p><small>Saved to Admin Database ID: ${newInquiry._id}</small></p>
            `,
        });

        res.status(200).json({ message: 'Thank you! Your details have been saved and sent to our team.' });

    } catch (error) {
        console.error("CONTACT FORM ERROR:", error);
        res.status(500).json({ message: 'Sorry, there was an error processing your request. Please try again later.' });
    }
};

// @desc    Get all inquiries (Admin)
// @route   GET /api/contact
// @access  Private/Admin
const getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update inquiry status
// @route   PUT /api/contact/:id
// @access  Private/Admin
const updateInquiryStatus = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (inquiry) {
            inquiry.status = req.body.status || inquiry.status;
            const updatedInquiry = await inquiry.save();
            res.json(updatedInquiry);
        } else {
            res.status(404).json({ message: 'Inquiry not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete inquiry
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteInquiry = async (req, res) => {
     try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (inquiry) {
            await inquiry.deleteOne();
            res.json({ message: 'Inquiry removed' });
        } else {
            res.status(404).json({ message: 'Inquiry not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    submitContactForm,
    getInquiries,
    updateInquiryStatus,
    deleteInquiry
};