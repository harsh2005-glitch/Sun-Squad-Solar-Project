// Commission Schema 
const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sourceDeposit: { type: mongoose.Schema.Types.ObjectId, ref: 'Deposit', required: true },
    sourceUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    commissionType: { type: String, enum: ['self', 'team'], required: true },
    percentageEarned: { type: Number, required: true },
}, { timestamps: true });

const Commission = mongoose.model('Commission', commissionSchema);
module.exports = Commission;