const User = require('../models/user');
const Deposit = require('../models/deposit');
const Commission = require('../models/commission');
const Settings = require('../models/settings');
const Transaction = require('../models/transaction');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


/**
 * @desc    Helper function to determine the correct commission percentage for a user.
 *          It finds the highest tier a user qualifies for based on their business volume.
 * @param   {number} selfBusiness - The user's total self business.
 * @param   {number} teamBusiness - The user's total team business.
 * @param   {Array} tiers - The array of commission tiers from settings.
 * @returns {number} The calculated commission percentage.
 */
const determineCommissionPercentage = (selfBusiness, teamBusiness, tiers) => {
    // Sort tiers by percentage in descending order to find the best one first
    const sortedTiers = [...tiers].sort((a, b) => b.commissionPercentage - a.commissionPercentage);

    for (const tier of sortedTiers) {
        if (selfBusiness >= tier.selfBusinessMin && selfBusiness <= tier.selfBusinessMax &&
            teamBusiness >= tier.teamBusinessMin && teamBusiness <= tier.teamBusinessMax) {
            return tier.commissionPercentage; // Return the first (highest) tier they qualify for
        }
    }

    // If no specific tier is met, return a default minimum (e.g., from the first tier)
    return tiers[0]?.commissionPercentage || 0;
};


// @desc    Get all users for the admin panel.
// @route   GET /api/admin/users
// @access  Admin

const updateUserStatus = async (req, res) => {
    const { isActive } = req.body; // Expecting { isActive: true } or { isActive: false }
    const { id } = req.params; // Get the user's ID from the URL

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // We will add an 'isActive' field to the user schema
        user.isActive = isActive;
        await user.save();

        res.json({ message: `User has been ${isActive ? 'activated' : 'deactivated'}.` });

    } catch (error) {
        console.error("UPDATE USER STATUS ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getGenealogyTree = async (req, res) => {
    try {
        // --- ADD selfBusiness and teamBusiness to the select() ---
        const users = await User.find({})
            .select('name associateId sponsor directs currentSelfBalance currentTeamBalance')
            .lean();

        res.json(users);
    } catch (error) {
        console.error("GET GENEALOGY ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        console.error("GET ALL USERS ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get dashboard statistics for the admin panel.
// @route   GET /api/admin/dashboard
// @access  Admin
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'associate', status: 'active' });

        const totalBusinessResult = await Deposit.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalBusiness = totalBusinessResult.length > 0 ? totalBusinessResult[0].total : 0;

        res.json({
            totalUsers,
            totalBusiness,
        });
    } catch (error) {
        console.error("GET ADMIN STATS ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add a new deposit and trigger all updates
// @route   POST /api/admin/deposits
const addDeposit = async (req, res) => {
    const { associateId, amount , description  } = req.body;
    const adminId = req.user.id;
    const depositAmount = Number(amount);

    try {
        const settings = await Settings.findOne({ singleton: 'main_settings' });
        if (!settings) throw new Error('Business settings not configured.');

        const depositor = await User.findOne({ associateId });
        if (!depositor) return res.status(404).json({ message: 'User not found.' });

        // Create transaction record
        await Transaction.create({
            user: depositor._id,
            type: 'deposit',
            amount: depositAmount,
            description: description,
            adminResponsible: adminId,
        });

        // Trigger the master update function with a positive amount
        await updateUserAndUpline(depositor._id, depositAmount, settings);

        res.status(201).json({ message: 'Deposit recorded and all balances/incomes updated.' });
    } catch (error) {
        console.error("ADD DEPOSIT ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};




// @desc    Add a new withdrawal and trigger all updates
// @route   POST /api/admin/withdrawals
const addWithdrawal = async (req, res) => {
    const { associateId, amount , description  } = req.body;
    const adminId = req.user.id;
    const withdrawalAmount = Number(amount);

    try {
        const settings = await Settings.findOne({ singleton: 'main_settings' });
        if (!settings) throw new Error('Business settings not configured.');
        
        const user = await User.findOne({ associateId });
        if (!user) return res.status(404).json({ message: 'User not found.' });
        
        // Create transaction record
        await Transaction.create({
            user: user._id,
            type: 'withdrawal',
            amount: withdrawalAmount,
             description: description,
            adminResponsible: adminId,
        });

        // Trigger the master update function with a negative amount
        await updateUserAndUpline(user._id, -withdrawalAmount, settings);
        
        res.status(201).json({ message: 'Withdrawal recorded and all balances/incomes updated.' });
    } catch (error) {
        console.error("ADD WITHDRAWAL ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};
// --- NEW FUNCTION: Get Transaction History ---
const getTransactionHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find({})
            .populate('user', 'name associateId') // Get user's name and ID
            .populate('adminResponsible', 'name') // Get admin's name
            .sort({ createdAt: -1 }); // Show newest first

        res.json(transactions);
    } catch (error) {
        console.error("GET TRANSACTIONS ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};



// --- NEW: The Slab Calculation Engine (For Self Income - Progressive) ---
const calculateSlabIncome = (balance, slabs) => {
    let income = 0;
    let remainingBalance = balance;
    
    // Sort slabs by 'from' amount to process them in order
    const sortedSlabs = [...slabs].sort((a, b) => a.from - b.from);

    for (const slab of sortedSlabs) {
        if (remainingBalance <= 0) break;

        // Determine the amount of balance that falls into this slab
        const slabRange = slab.to - slab.from + (slab.from === 0 ? 0 : 1);
        const applicableBalance = Math.min(remainingBalance, slabRange);
        
        income += applicableBalance * (slab.percentage / 100);
        
        remainingBalance -= applicableBalance;
    }
    return income;
};

// --- NEW: Helper to get Percentage Level (For Team Income - Differential) ---
const getPercentageLevel = (amount, slabs) => {
    if (amount <= 0) return 0; // FIX: Return 0% if business is 0

    // Find the slab that the total amount falls into
    // We assume slabs cover the entire range. If amount > max slab, use the highest.
    const sortedSlabs = [...slabs].sort((a, b) => a.from - b.from);
    let applicablePercentage = 0;

    for (const slab of sortedSlabs) {
        if (amount >= slab.from) {
            applicablePercentage = slab.percentage;
        }
    }
    return applicablePercentage;
};


// --- NEW: The Master Update Function ---
const updateUserAndUpline = async (userId, amountChange, settings) => {
    const user = await User.findById(userId);
    if (!user) return;

    // Ensure amountChange is a number
    const change = Number(amountChange);
    if (isNaN(change)) return;

    // 1. Update the user's self balance and recalculate their self income (Progressive)
    const oldSelfIncome = user.selfIncome || 0;
    user.currentSelfBalance += change;
    user.selfIncome = calculateSlabIncome(user.currentSelfBalance, settings.selfIncomeSlabs);
    
    // Record Self Income Commission
    const selfIncomeEarned = user.selfIncome - oldSelfIncome;
    if (selfIncomeEarned > 0) {
        await Commission.create({
            recipient: user._id,
            amount: selfIncomeEarned,
            commissionType: 'self_business',
            description: 'Income from Self Business',
            sourceUser: user._id
        });
    }

    // Determine the user's current level based ONLY on Team Business
    // For the depositor, this is their existing Team Business (excluding their own new deposit)
    const userTeamBusiness = user.currentTeamBalance;
    let lastProcessedPercentage = getPercentageLevel(userTeamBusiness, settings.teamIncomeSlabs);
    
    await user.save();

    // 2. Traverse the upline for Differential Team Income
    let currentSponsor = await User.findById(user.sponsor);
    
    while (currentSponsor) {
        // Update the sponsor's team balance
        currentSponsor.currentTeamBalance += change;
        
        // Determine Sponsor's Level based ONLY on their NEW Team Business
        const sponsorTeamBusiness = currentSponsor.currentTeamBalance;
        const sponsorPercentage = getPercentageLevel(sponsorTeamBusiness, settings.teamIncomeSlabs);
        
        // Calculate Gap Commission
        // Profit = (Sponsor% - Downline%) * NewDepositAmount
        const gap = sponsorPercentage - lastProcessedPercentage;
        
        if (gap > 0) {
            const commission = change * (gap / 100);
            
            // Safeguard: Ensure commission is positive before adding
            if (commission > 0) {
                currentSponsor.teamIncome += commission;
                
                // Record Team Commission
                await Commission.create({
                    recipient: currentSponsor._id,
                    amount: commission,
                    commissionType: 'team_business',
                    sourceUser: user._id, // The depositor
                    description: `Team Commission from ${user.name} (${gap}%)`,
                    percentageEarned: gap
                });
            }

            // The sponsor now becomes the new "floor" for the next upline
            lastProcessedPercentage = sponsorPercentage;
        } else {
            // If Sponsor% <= Downline%, they get 0.
            // The "floor" for the next upline is the max of the two.
            lastProcessedPercentage = Math.max(lastProcessedPercentage, sponsorPercentage);
        }

        await currentSponsor.save();
        
        currentSponsor = await User.findById(currentSponsor.sponsor);
    }
};

// @desc    Get a single user by their ID
// @route   GET /api/admin/users/:id
// @access  Admin
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password').populate('sponsor', 'name associateId'); ;
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("GET USER BY ID ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Allow an admin to log in as another user
// @route   POST /api/admin/impersonate/:id
// @access  Admin
const loginAsUser = async (req, res) => {
    try {
        // Find the user the admin wants to log in as
        const targetUser = await User.findById(req.params.id);

        if (!targetUser) {
            return res.status(404).json({ message: 'Target user not found.' });
        }
        
        if (targetUser.role === 'admin') {
            return res.status(400).json({ message: 'Cannot impersonate another admin.' });
        }

        // If everything is okay, generate a token for the target user
        res.json({
            _id: targetUser._id,
            name: targetUser.name,
            email: targetUser.email,
            role: targetUser.role,
            onboardingRequired: targetUser.status !== 'active',
            // This is the new token for the associate
            token: generateToken(targetUser._id),
        });
    } catch (error) {
        console.error("IMPERSONATE ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Reset a user's password to their phone number (Admin only)
// @route   PUT /api/admin/users/:id/reset-password
// @access  Admin
const resetUserPassword = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Set password to the user's phone number
        user.password = user.phone;
        // Set the flag so they are forced to change it on next login
        user.isPasswordResetRequired = true;
        // Clear the request flag since the admin has handled it
        user.passwordResetRequested = false;

        // The pre-save hook in the User model will hash this new password
        await user.save();

        res.json({ message: `Password reset to user's phone number (${user.phone}). User will be prompted to change it on next login.` });

    } catch (error) {
        console.error("ADMIN RESET PASSWORD ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getAllUsers,
    addDeposit,
    getDashboardStats,
    getGenealogyTree,
    updateUserStatus,
    getUserById,
    loginAsUser,
    addWithdrawal,
    getTransactionHistory,
    resetUserPassword,
    // addDeposit,
    // addWithdrawal,
};