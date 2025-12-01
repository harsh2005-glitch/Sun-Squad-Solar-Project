// Commission Schema 
const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Made sourceDeposit optional since we might not always link to a specific deposit doc if using transactions
    sourceDeposit: { type: mongoose.Schema.Types.ObjectId, ref: 'Deposit' }, 
    // Made sourceUser optional for self-commissions if needed, though usually it's the user themselves
    sourceUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    // Expanded types
    commissionType: { type: String, enum: ['self', 'team', 'self_business', 'team_business'], required: true },
    percentageEarned: { type: Number }, // Optional now
    description: { type: String } // Added description
}, { timestamps: true });

const Commission = mongoose.model('Commission', commissionSchema);
module.exports = Commission;