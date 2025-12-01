const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
const Deposit = require('./models/deposit');
const Transaction = require('./models/transaction');
const Commission = require('./models/commission');

dotenv.config();

const resetFinancials = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // 1. Reset User Balances
        console.log('Resetting User Balances...');
        await User.updateMany({}, {
            $set: {
                currentSelfBalance: 0,
                currentTeamBalance: 0,
                selfIncome: 0,
                teamIncome: 0,
                // Reset legacy fields just in case
                selfBusiness: 0,
                teamBusiness: 0,
                totalBusiness: 0
            }
        });
        console.log('User Balances Reset.');

        // 2. Delete Transactions
        console.log('Deleting Transactions...');
        await Transaction.deleteMany({});
        console.log('Transactions Deleted.');

        // 3. Delete Deposits
        console.log('Deleting Deposits...');
        await Deposit.deleteMany({});
        console.log('Deposits Deleted.');

        // 4. Delete Commissions
        console.log('Deleting Commissions...');
        await Commission.deleteMany({});
        console.log('Commissions Deleted.');

        console.log('ALL FINANCIAL DATA RESET SUCCESSFULLY.');
        process.exit(0);
    } catch (error) {
        console.error('Error resetting financials:', error);
        process.exit(1);
    }
};

resetFinancials();
