const User = require('../models/user');
const Deposit = require('../models/deposit');
const Commission = require('../models/commission');
const Settings = require('../models/settings');

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

// @desc    Add a new deposit and trigger all business logic.
// @route   POST /api/admin/deposits
// @access  Admin
const addDeposit = async (req, res) => {
    const { associateId, amount } = req.body;
    const adminId = req.user.id;

    if (!associateId || !amount || amount <= 0) {
        return res.status(400).json({ message: 'Associate ID and a valid amount are required.' });
    }

    try {
        // --- 1. Get Business Rules & Depositor ---
        const settings = await Settings.findOne({ singleton: 'main_settings' });
        if (!settings || !settings.commissionTiers || settings.commissionTiers.length === 0) {
            return res.status(500).json({ message: 'Business commission tiers are not configured.' });
        }

        const depositor = await User.findOne({ associateId });
        if (!depositor) {
            return res.status(404).json({ message: 'User with that Associate ID not found.' });
        }

        const depositAmount = Number(amount);

        // --- 2. Create Deposit Record & Update Depositor's Self Business ---
        const deposit = await Deposit.create({
            depositor: depositor._id,
            amount: depositAmount,
            approvedBy: adminId,
        });
        depositor.selfBusiness += depositAmount;

        // --- 3. Update Depositor's Commission Percentage & Calculate Their Commission ---
        depositor.commissionPercentage = determineCommissionPercentage(
            depositor.selfBusiness,
            depositor.teamBusiness, // At this point, their team business hasn't changed yet
            settings.commissionTiers
        );
        await depositor.save();

        // The user earns commission based on their newly updated percentage
        await Commission.create({
            recipient: depositor._id,
            sourceDeposit: deposit._id,
            sourceUser: depositor._id,
            amount: depositAmount * (depositor.commissionPercentage / 100),
            commissionType: 'self',
            percentageEarned: depositor.commissionPercentage,
        });

        // --- 4. Traverse Upline to Update Team Business & Percentages ---
        let currentSponsor = await User.findById(depositor.sponsor);
        while (currentSponsor) {
            // Update the sponsor's team business
            currentSponsor.teamBusiness += depositAmount;

            // Re-evaluate the sponsor's commission percentage based on their new business total
            currentSponsor.commissionPercentage = determineCommissionPercentage(
                currentSponsor.selfBusiness,
                currentSponsor.teamBusiness,
                settings.commissionTiers
            );
            await currentSponsor.save();

            // Move to the next sponsor in the chain
            currentSponsor = await User.findById(currentSponsor.sponsor);
        }

        res.status(201).json({ message: 'Deposit added. Business and commission percentages have been updated for the entire chain.' });

    } catch (error) {
        console.error("ADD DEPOSIT ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getAllUsers,
    addDeposit,
    getDashboardStats,
};