const mongoose = require('mongoose');

// A generic schema for a commission slab
const slabSchema = new mongoose.Schema({
    from: { type: Number, required: true },
    to: { type: Number, required: true },
    percentage: { type: Number, required: true }
});

const settingsSchema = new mongoose.Schema({
    singleton: { type: String, default: 'main_settings', unique: true },
    selfIncomeSlabs: [slabSchema],
    teamIncomeSlabs: [slabSchema]
});

const Settings = mongoose.model('Settings', settingsSchema);
module.exports = Settings;