// Logic for signup, login, onboarding 
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Resend } = require('resend');
const crypto = require('crypto');
// Helper function to generate a unique Associate ID
const generateAssociateId = () => {
    // Generates a random 8-digit number. You can customize this logic.
    return Math.floor(10000000 + Math.random() * 90000000).toString();
};

// Helper function to generate a JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token will be valid for 30 days
    });
};


// @desc    Register a new user (initial step)
// @route   POST /api/auth/signup
const signupUser = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // 1. Check if all fields are provided
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        // 2. Check if user already exists (by email or phone)
        const userExists = await User.findOne({ $or: [{ email }, { phone }] });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email or phone already exists.' });
        }

        // 3. Create the new user (password will be hashed by the pre-save hook in the model)
        const user = await User.create({
            name,
            email,
            phone,
            password,
        });

        // 4. Respond with success
        res.status(201).json({
            message: "Signup successful! Please log in to complete your profile."
        });

    } catch (error) {
        console.error("SIGNUP ERROR:", error);
        res.status(500).json({ message: 'Server error during signup.', error: error.message });
    }
};


// @desc    Authenticate a user and get token
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
    const { phone, password } = req.body;

    try {
        // 1. Find the user by phone number
        const user = await User.findOne({ phone });

        // 2. Check if user exists and if password matches
        if (user && (await bcrypt.compare(password, user.password))) {

            if (!user.isActive) {
                return res.status(403).json({ message: 'Your account has been deactivated. Please contact support.' }); // 403 Forbidden
            }
            // 3. Respond with token and user status
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                onboardingRequired: user.status === 'pendingOnboarding',
                role: user.role // <-- MAKE SURE THIS LINE IS HERE
            });
        } else {
            res.status(401).json({ message: 'Invalid phone number or password.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error during login.', error: error.message });
    }
};


// @desc    Complete the user's profile after first login
// @route   POST /api/auth/complete-onboarding
const completeOnboarding = async (req, res) => {
    const { sponsorId, address, bankName, accountNumber, ifscCode } = req.body;
    const userId = req.user.id; // We get this from the token after protecting the route

    try {
        // 1. Find the user who is completing their profile
        const user = await User.findById(userId);
        if (!user || user.status !== 'pendingOnboarding') {
             return res.status(400).json({ message: 'Invalid request. User not found or already active.' });
        }

        // 2. Find and validate the sponsor
        const sponsor = await User.findOne({ associateId: sponsorId });
        if (!sponsor) {
            return res.status(404).json({ message: 'Sponsor not found. Please check the Sponsor ID.' });
        }

        // 3. Generate a unique Associate ID for the new user
        let newAssociateId;
        let isUnique = false;
        while (!isUnique) {
            newAssociateId = generateAssociateId();
            const idExists = await User.findOne({ associateId: newAssociateId });
            if (!idExists) {
                isUnique = true;
            }
        }
        
        // 4. Update the user's document
        user.sponsor = sponsor._id;
        user.address = address;
        user.bankName = bankName;
        user.accountNumber = accountNumber;
        user.ifscCode = ifscCode;
        user.associateId = newAssociateId;
        user.status = 'active'; // Activate the user!
        await user.save();

        // 5. Add the new user to their sponsor's 'directs' array
        sponsor.directs.push(user._id);
        await sponsor.save();
        
        // 6. Respond with success
        res.status(200).json({ message: 'Profile completed successfully! Welcome aboard.', user });

    } catch (error) {
        res.status(500).json({ message: 'Server error during onboarding.', error: error.message });
    }
};


// @desc    Generate and email a password reset token using Resend
// @route   POST /api/auth/forgotpassword
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    // Initialize Resend with your API key from .env
    const resend = new Resend(process.env.RESEND_API_KEY);

    let user; // Define user outside the try block for access in catch
    try {
        user = await User.findOne({ email });
        if (!user) {
            // Security: Always send a success-like response to prevent email enumeration
            return res.status(200).json({ message: 'If an account with that email exists, a reset link has been sent.' });
        }

        // 1. Generate the reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // 2. Hash token and set expiry on the user object in the DB
        user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save({ validateBeforeSave: false });

        // 3. Create the full reset URL for the frontend
        // IMPORTANT: In production, you MUST replace 'localhost:3000' with your actual frontend domain
        const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

        // 4. Send the email using Resend
        await resend.emails.send({
            from: 'Sun Squad Solar <onboarding@resend.dev>', // Resend's default sending address
            to: [user.email], // The recipient's email
            subject: 'Password Reset Request',
            // You can use plain text or create a beautiful HTML email
            html: `
                <p>You are receiving this email because you (or someone else) have requested the reset of a password. Please click the following link to complete the process:</p>
                <a href="${resetUrl}" target="_blank">Reset Your Password</a>
                <p>This link will expire in 10 minutes.</p>
                <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            `,
        });
        
        res.status(200).json({ message: 'If an account with that email exists, a reset link has been sent.' });

    } catch (error) {
        console.error("FORGOT PASSWORD ERROR:", error);
        // If an error occurs, clear the token fields to allow the user to try again
        if (user) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
        }
        res.status(500).json({ message: 'Email could not be sent. Please try again later.' });
    }
};


// @desc    Reset password using token
// @route   PUT /api/auth/resetpassword/:token
const resetPassword = async (req, res) => {
    try {
        // 1. Get the hashed version of the token from the URL
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        // 2. Find the user by the hashed token and check if it's not expired
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }, // $gt = greater than
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token.' });
        }

        // 3. Set the new password
        user.password = req.body.password;
        // 4. Clear the reset token fields
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        // The 'pre-save' hook in user.js will automatically hash the new password
        await user.save();

        res.status(200).json({ message: 'Password reset successful! You can now log in.' });
    } catch (error) {
        console.error("RESET PASSWORD ERROR:", error);
        res.status(500).json({ message: 'Server error.' });
    }
};


module.exports = {
    signupUser,
    loginUser,
    completeOnboarding,
    forgotPassword,
    resetPassword,
};