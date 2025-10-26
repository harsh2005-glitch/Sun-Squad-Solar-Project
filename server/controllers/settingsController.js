const Settings = require('../models/settings');

// @desc    Get the current system settings
// @route   GET /api/settings
// @access  Admin
const getSettings = async (req, res) => {
    try {
        // There is only one settings document, so we find it by its unique key.
        const settings = await Settings.findOne({ singleton: 'main_settings' });
        if (!settings) {
            // This case should ideally not happen if we've seeded the DB
            return res.status(404).json({ message: 'Settings not found. Please initialize them.' });
        }
        res.json(settings);
    } catch (error) {
        console.error("GET SETTINGS ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update the system settings
// @route   PUT /api/settings
// @access  Admin
const updateSettings = async (req, res) => {
    try {
        // Find the unique settings document
        const settings = await Settings.findOne({ singleton: 'main_settings' });
        if (!settings) {
            return res.status(404).json({ message: 'Settings not found.' });
        }

        // Update the fields with the data from the request body
        settings.selfIncomeSlabs = req.body.selfIncomeSlabs || settings.selfIncomeSlabs;
        settings.teamIncomeSlabs = req.body.teamIncomeSlabs || settings.teamIncomeSlabs;
        // Add any other settings you want to make editable in the future here

        const updatedSettings = await settings.save();
        res.json({
            message: 'Settings updated successfully!',
            settings: updatedSettings,
        });
    } catch (error) {
        console.error("UPDATE SETTINGS ERROR:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update the notice board message
// @route   PUT /api/settings/notice
// @access  Admin
const updateNotice = async (req, res) => {
    const { noticeMessage } = req.body;
    try {
        const settings = await Settings.findOneAndUpdate(
            { singleton: 'main_settings' },
            { noticeMessage: noticeMessage },
            { new: true, upsert: true } // 'new' returns the updated doc, 'upsert' creates it if it doesn't exist
        );
        res.json({ message: 'Notice updated successfully!', settings });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getSettings,
    updateSettings,
    updateNotice,
};