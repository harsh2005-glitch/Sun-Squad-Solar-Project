const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Settings = require('./models/settings');

dotenv.config();

const checkSettings = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const settings = await Settings.findOne({ singleton: 'main_settings' });
        if (settings) {
            console.log('--- SELF INCOME SLABS ---');
            console.log(JSON.stringify(settings.selfIncomeSlabs, null, 2));
            
            console.log('\n--- TEAM INCOME SLABS ---');
            console.log(JSON.stringify(settings.teamIncomeSlabs, null, 2));
        } else {
            console.log('No settings found.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error checking settings:', error);
        process.exit(1);
    }
};

checkSettings();
