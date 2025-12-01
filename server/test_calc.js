const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Settings = require('./models/settings');

dotenv.config();

// COPY OF THE FUNCTION FROM adminController.js
const calculateSlabIncome = (balance, slabs) => {
    let income = 0;
    let remainingBalance = balance;
    
    // Sort slabs by 'from' amount to process them in order
    const sortedSlabs = [...slabs].sort((a, b) => a.from - b.from);

    console.log(`\nCalculating for Balance: ${balance}`);

    for (const slab of sortedSlabs) {
        if (remainingBalance <= 0) break;

        // Determine the amount of balance that falls into this slab
        const slabRange = slab.to - slab.from + (slab.from === 0 ? 0 : 1);
        const applicableBalance = Math.min(remainingBalance, slabRange);
        
        const slabIncome = applicableBalance * (slab.percentage / 100);
        income += slabIncome;
        
        console.log(`- Slab ${slab.from}-${slab.to} (${slab.percentage}%): Applied to ${applicableBalance} = ${slabIncome}`);

        remainingBalance -= applicableBalance;
    }
    return income;
};

const testCalculation = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const settings = await Settings.findOne({ singleton: 'main_settings' });
        
        if (!settings) {
            console.log('No settings found.');
            return;
        }

        const depositAmount = 700000;
        const calculatedIncome = calculateSlabIncome(depositAmount, settings.selfIncomeSlabs);

        console.log(`\nTotal Income for ${depositAmount}: ${calculatedIncome}`);
        
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

testCalculation();
