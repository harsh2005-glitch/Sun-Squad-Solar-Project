const { Resend } = require('resend');

// @desc    Handle contact form submission
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'Please fill out all fields.' });
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>', // From Resend's default
            to: 'sunsquadsolar4@gmail.com', // <-- YOUR EMAIL ADDRESS
            subject: `New Contact Form Submission: ${subject}`,
            reply_to: email, // So you can reply directly to the user
            html: `
                <h1>New Inquiry from your Website</h1>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        res.status(200).json({ message: 'Thank you for your message! We will get back to you shortly.' });

    } catch (error) {
        console.error("CONTACT FORM ERROR:", error);
        res.status(500).json({ message: 'Sorry, there was an error sending your message. Please try again later.' });
    }
};

module.exports = {
    submitContactForm,
};