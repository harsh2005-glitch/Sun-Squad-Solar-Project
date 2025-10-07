// User Schema 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    associateId: { type: String, unique: true, sparse: true },
    sponsor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    address: { type: String },
    bankName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    status: { type: String, enum: ['pendingOnboarding', 'active'], default: 'pendingOnboarding' },
    directs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    level: { type: Number, default: 7 },
    selfBusiness: { type: Number, default: 0 },
    teamBusiness: { type: Number, default: 0 },
    totalBusiness: { type: Number, default: 0 },
    commissionPercentage: { type: Number, default: 2 },
    role: { type: String, enum: ['associate', 'admin'], default: 'associate' },
    dateOfJoining: { type: Date, default: Date.now }
}, { timestamps: true });

// Hash password before saving the user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;