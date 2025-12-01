// Logic for user profile, network data 
const User = require('../models/user');
const Commission = require('../models/commission');
const cloudinary = require('cloudinary').v2; // <-- THIS IS THE FIX
const Transaction = require('../models/transaction');
const bcrypt = require('bcryptjs');
const { subDays, format } = require('date-fns');
const Settings = require('../models/settings');

// @desc    Get data for the user dashboard
// @route   GET /api/users/dashboard
// @access  Protected


const getDashboardData = async (req, res) => {
    try {
        // req.user is already fetched by the 'protect' middleware. We don't need to find it again.
        const user = req.user; 

        // Get directs with only necessary fields
        const directs = await User.find({ sponsor: user._id }).select('name associateId dateOfJoining');
        const settings = await Settings.findOne({ singleton: 'main_settings' });

        res.json({
            userInfo: {
                name: user.name,
                associateId: user.associateId,
                mobile: user.phone,
                address: user.address,
                profilePicture: user.profilePicture,
            },
            // Send the new balance and income fields
            balanceStats: {
                currentSelfBalance: user.currentSelfBalance,
                currentTeamBalance: user.currentTeamBalance,
            },
            incomeStats: {
                selfIncome: user.selfIncome,
                teamIncome: user.teamIncome,
                totalIncome: user.selfIncome + user.teamIncome,
            },
            teamStats: {
                totalDirectTeam: directs.length,
                // We will implement total team members later if needed
                totalTeamMember: directs.length, 
            },
            directSponsors: directs,
             notice: settings ? settings.noticeMessage : ''
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
            // user.bankName = req.body.bankName || user.bankName;
            // user.accountNumber = req.body.accountNumber || user.accountNumber;
            // user.ifscCode = req.body.ifscCode || user.ifscCode;
             user.aadharNumber = req.body.aadharNumber || user.aadharNumber;
            user.panNumber = req.body.panNumber || user.panNumber;
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
const updateUserProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'profile_pictures' });
        const user = await User.findById(req.user.id);
        user.profilePicture = result.secure_url;
        await user.save();
        res.json({
            message: 'Profile picture updated successfully.',
            profilePicture: result.secure_url,
        });
    } catch (error) {
        console.error("PROFILE PICTURE UPLOAD ERROR:", error);
        res.status(500).json({ message: 'Server error during image upload.' });
    }
};


const getPayoutDetails = async (req, res) => {
    try {
        const user = req.user;
        // Find all transactions where this user is the primary subject
        const selfTransactions = await Transaction.find({ user: user._id }).sort({ createdAt: -1 });

        // This is more complex: find transactions from downline members
        // For now, we will just show self-transactions. We can add team transactions later.
        
        res.json({
            balances: {
                currentSelfBalance: user.currentSelfBalance,
                currentTeamBalance: user.currentTeamBalance,
            },
            incomes: {
                selfIncome: user.selfIncome,
                teamIncome: user.teamIncome,
                totalIncome: user.selfIncome + user.teamIncome,
            },
            transactions: selfTransactions,
        });
    } catch (error) {
         console.error("GET PAYOUT DETAILS ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Upload or update user's bank document (cheque/passbook)
// @route   PUT /api/users/profile/bank-document
// @access  Protected

const uploadBankDocument = async (req, res) => {
     console.log("File received by controller:", req.file);
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            // Optional: You can put bank documents in a separate folder in Cloudinary
            folder: 'bank_documents', 
        });
         // Find the user and update their bank document URL
        const user = await User.findById(req.user.id);
        user.bankDocumentUrl = result.secure_url; // Save the URL
        await user.save();

        res.json({
            message: 'Bank document uploaded successfully.',
            bankDocumentUrl: result.secure_url,
        });
    } catch (error) {
        console.error("BANK DOCUMENT UPLOAD ERROR:", error);
        res.status(500).json({ message: 'Server error during image upload.' });
    }
};

// @desc    Upload Aadhar Card
// @route   PUT /api/users/profile/aadhar-card
const uploadAadharCard = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });

        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'identity_documents' });
        
        const user = await User.findById(req.user.id);
        user.aadharCardUrl = result.secure_url;
        await user.save();

        res.json({ message: 'Aadhar Card uploaded successfully.', aadharCardUrl: result.secure_url });
    } catch (error) {
        res.status(500).json({ message: 'Server error during Aadhar upload.' });
    }
};

// @desc    Upload PAN Card
// @route   PUT /api/users/profile/pan-card
const uploadPanCard = async (req, res) => {
     try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });

        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'identity_documents' });

        const user = await User.findById(req.user.id);
        user.panCardUrl = result.secure_url;
        await user.save();

        res.json({ message: 'PAN Card uploaded successfully.', panCardUrl: result.secure_url });
    } catch (error) {
        res.status(500).json({ message: 'Server error during PAN upload.' });
    }
};

// Helper function to recursively fetch downline members
const getDownline = async (userId) => {
    // Find all users who have this userId as their sponsor
    const directs = await User.find({ sponsor: userId })
        .select('name associateId currentSelfBalance currentTeamBalance sponsor')
        .lean();

    // If a user has no directs, return an empty array
    if (directs.length === 0) {
        return [];
    }

    // For each direct, recursively call this function to get their downline
    const children = await Promise.all(
        directs.map(async (direct) => ({
            name: direct.name,
            attributes: {
                associateId: direct.associateId,
                totalBusiness: (direct.currentSelfBalance || 0) + (direct.currentTeamBalance || 0),
            },
            // This is the recursive call
            children: await getDownline(direct._id),
        }))
    );

    return children;
};

// @desc    Get the genealogy tree for the logged-in user
// @route   GET /api/users/genealogy
// @access  Protected
const getGenealogyTree = async (req, res) => {
    try {
        const user = req.user; // We get this from the 'protect' middleware

        // 1. Fetch the user's entire downline recursively
        const downlineChildren = await getDownline(user._id);

        // 2. Construct the final tree data with the logged-in user as the root
        const treeData = {
            name: user.name,
            attributes: {
                associateId: user.associateId,
                totalBusiness: (user.currentSelfBalance || 0) + (user.currentTeamBalance || 0),
            },
            children: downlineChildren,
        };

        res.json(treeData);

    } catch (error) {
        console.error("USER GENEALOGY ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// @desc    Change user password
// @route   PUT /api/users/profile/changepassword
// @access  Protected
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Please provide both old and new passwords.' });
    }
    
    if (newPassword.length < 6) {
         return res.status(400).json({ message: 'New password must be at least 6 characters long.' });
    }

    try {
        // We need to fetch the user with their password, so we don't use req.user
        const user = await User.findById(req.user.id);

        // Check if the provided old password matches the one in the database
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect old password.' });
        }

        // Set the new password
        user.password = newPassword;
        
        // The pre-save hook in the User model will automatically hash it
        await user.save();

        res.json({ message: 'Password changed successfully.' });

    } catch (error) {
        console.error("CHANGE PASSWORD ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get income data for the last 30 days for a line chart
// @route   GET /api/users/charts/income
// @access  Protected
const getIncomeChartData = async (req, res) => {
    try {
        const today = new Date();
        const thirtyDaysAgo = subDays(today, 30);

        // 1. Aggregate commissions by date
        const commissionsByDay = await Commission.aggregate([
            {
                $match: {
                    recipient: req.user._id,
                    createdAt: { $gte: thirtyDaysAgo },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalIncome: { $sum: "$amount" },
                },
            },
            { $sort: { _id: 1 } }, // Sort by date ascending
        ]);
        
        // 2. Create a map for easy lookup
        const incomeMap = new Map(commissionsByDay.map(item => [item._id, item.totalIncome]));

        // 3. Create a complete 30-day data array, filling in days with 0 income
        const chartData = Array.from({ length: 30 }).map((_, i) => {
            const date = subDays(today, 29 - i);
            const dateString = format(date, 'yyyy-MM-dd');
            const shortDate = format(date, 'MMM d'); // e.g., "Oct 18"
            return {
                date: shortDate,
                income: incomeMap.get(dateString) || 0,
            };
        });

        res.json(chartData);

    } catch (error) {
        console.error("INCOME CHART ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get team balance contribution from direct members for a pie chart
// @route   GET /api/users/charts/team-contribution
// @access  Protected
const getTeamContributionData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate('directs', 'name currentSelfBalance currentTeamBalance');

        if (!user) return res.status(404).json({ message: 'User not found' });
        
        const pieChartData = user.directs.map(direct => {
            const contribution = (direct.currentSelfBalance || 0) + (direct.currentTeamBalance || 0);
            return {
                name: direct.name,
                value: contribution,
            };
        }).filter(item => item.value > 0); // Only include members with a contribution

        res.json(pieChartData);
    } catch (error) {
        console.error("TEAM CHART ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};




module.exports = {
    getDashboardData,
    getDirects,
    getUserProfile,
    updateUserProfile,
    updateUserProfilePicture,
    uploadBankDocument,
    uploadAadharCard,
    uploadPanCard,
    getGenealogyTree,
    getCommissions,
    getPayoutDetails,
    changePassword,
     getIncomeChartData,
    getTeamContributionData,
};
