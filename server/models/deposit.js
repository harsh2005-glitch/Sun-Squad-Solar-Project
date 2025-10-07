// Deposit Schema 
const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    depositor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isProcessedForCommission: { type: Boolean, default: false }
}, { timestamps: true });

const Deposit = mongoose.model('Deposit', depositSchema);
module.exports = Deposit;