const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String },
    amount: { type: Number, required: true },
    timePeriod: {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true }
    }
});

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;
