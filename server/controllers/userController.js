// Logic for user profile, network data 
const User = require('../models/user');
const Commission = require('../models/commission');
// @desc    Get data for the user dashboard
// @route   GET /api/users/dashboard
// @access  Protected
const getDashboardData = async (req, res) => {
    try {
        // req.user is attached by our 'protect' middleware
        const user = await User.findById(req.user.id)
            .select('-password') // Don't send the password hash
            .populate('directs', 'name associateId dateOfJoining'); // Populate directs with specific fields

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // For now, Total Team Member is just the number of directs.
        // We will build the logic for the full downline later.
        const totalTeamMember = user.directs.length; 

        res.json({
            userInfo: {
                name: user.name,
                associateId: user.associateId,
                mobile: user.phone,
                address: user.address,
                level: user.level,
                dateOfJoining: user.dateOfJoining,
            },
            businessStats: {
                selfBusiness: user.selfBusiness,
                teamBusiness: user.teamBusiness,
                totalBusiness: user.selfBusiness + user.teamBusiness, // Always calculate fresh
            },
            teamStats: {
                totalDirectTeam: user.directs.length,
                totalTeamMember: totalTeamMember,
            },
            directSponsors: user.directs,
        });

    } catch (error) {
        console.error("DASHBOARD ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getDirects = async (req, res) => {
    try {
        // Find the user and populate their directs with more detailed info
        const user = await User.findById(req.user.id)
            .populate('directs', 'name associateId dateOfJoining selfBusiness teamBusiness');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // We can also calculate their total business to send to the frontend
        const directsWithTotalBusiness = user.directs.map(direct => ({
            ...direct.toObject(), // Convert Mongoose document to a plain object
            totalBusiness: direct.selfBusiness + direct.teamBusiness
        }));

        res.json(directsWithTotalBusiness);

    } catch (error) {
        console.error("GET DIRECTS ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("GET PROFILE ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Protected
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            // Update the fields that are allowed to be changed
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.address = req.body.address || user.address;
            user.bankName = req.body.bankName || user.bankName;
            user.accountNumber = req.body.accountNumber || user.accountNumber;
            user.ifscCode = req.body.ifscCode || user.ifscCode;
            // Add any other fields from your "Update Profile" screenshot here

            const updatedUser = await user.save();
            res.json({
                message: "Profile updated successfully!",
                // Send back the updated user data (without password)
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                // etc.
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("UPDATE PROFILE ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};
// @desc    Get all commission records for the logged-in user
// @route   GET /api/users/commissions
// @access  Protected
const getCommissions = async (req, res) => {
    try {
        // Find all commissions where the recipient is the logged-in user
        const commissions = await Commission.find({ recipient: req.user.id })
            .populate('sourceUser', 'name associateId') // Get the name/ID of who generated the commission
            .sort({ createdAt: -1 }); // Show the most recent first

        res.json(commissions);
    } catch (error) {
        console.error("GET COMMISSIONS ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getDashboardData,
    getDirects,
    getUserProfile,
    updateUserProfile,
    getCommissions, // <-- Add the new function to exports
};
