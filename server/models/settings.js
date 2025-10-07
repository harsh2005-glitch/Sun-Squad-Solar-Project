const mongoose = require('mongoose');

// // Defines one level in our progression chart
// const levelSchema = new mongoose.Schema({
//     level: { type: Number, required: true }, // e.g., 7, 10, 13
//     requiredBusiness: { type: Number, required: true }, // e.g., 0, 500000, 2000000
// });

// const settingsSchema = new mongoose.Schema({
//     // A unique key to ensure we only ever have one settings document
//     singleton: { type: String, default: 'main_settings', unique: true },
    
//     levelChart: [levelSchema], // An array of level rules
//     selfCommissionRate: { type: Number, default: 7 }, // The fixed rate for self-deposits
// });
const commissionTierSchema = new mongoose.Schema({
    // Self Business Range
    selfBusinessMin: { type: Number, required: true },
    selfBusinessMax: { type: Number, required: true },
    
    // Team Business Range
    teamBusinessMin: { type: Number, required: true },
    teamBusinessMax: { type: Number, required: true },

    // The commission percentage for this tier
    commissionPercentage: { type: Number, required: true }
});

const settingsSchema = new mongoose.Schema({
    singleton: { type: String, default: 'main_settings', unique: true },
    commissionTiers: [commissionTierSchema] // An array of our new commission rules
});
const Settings = mongoose.model('Settings', settingsSchema);
module.exports = Settings;