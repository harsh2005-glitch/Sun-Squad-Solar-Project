const User = require('../models/user');
const Deposit = require('../models/deposit');
const Commission = require('../models/commission');
const Settings = require('../models/settings');
const Transaction = require('../models/transaction');


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
            .select('name associateId sponsor directs selfBusiness teamBusiness')
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
    const { associateId, amount } = req.body;
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
    const { associateId, amount } = req.body;
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



// --- NEW: The Slab Calculation Engine ---
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


// --- NEW: The Master Update Function ---
const updateUserAndUpline = async (userId, amountChange, settings) => {
    const user = await User.findById(userId);
    if (!user) return;

    // 1. Update the user's self balance and recalculate their self income
    user.currentSelfBalance += amountChange;
    user.selfIncome = calculateSlabIncome(user.currentSelfBalance, settings.selfIncomeSlabs);
    await user.save();

    // 2. Traverse the upline
    let currentSponsor = await User.findById(user.sponsor);
    while (currentSponsor) {
        // Update the sponsor's team balance
        currentSponsor.currentTeamBalance += amountChange;
        // Recalculate their team income based on the new team balance
        currentSponsor.teamIncome = calculateSlabIncome(currentSponsor.currentTeamBalance, settings.teamIncomeSlabs);
        await currentSponsor.save();
        
        currentSponsor = await User.findById(currentSponsor.sponsor);
    }
};

module.exports = {
    getAllUsers,
    addDeposit,
    getDashboardStats,
    getGenealogyTree,
    updateUserStatus,
    addWithdrawal,
    getTransactionHistory,
    // addDeposit,
    // addWithdrawal,
};