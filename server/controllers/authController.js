// Logic for signup, login, onboarding 
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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


module.exports = {
    signupUser,
    loginUser,
    completeOnboarding,
};