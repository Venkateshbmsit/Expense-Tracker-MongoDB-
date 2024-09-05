const Expense = require('../models/Expense');

// analytics
exports.getAnalytics = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start date and end date are required' });
        }

        const expenses = await Expense.find({
            user: req.user.id,
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        });

        if (!expenses.length) {
            return res.status(404).json({ message: 'No expenses found for the given date range' });
        }

        const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

        const categoryTotals = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});

        const largestExpenses = expenses.sort((a, b) => b.amount - a.amount).slice(0, 5);

        res.json({
            totalSpent,
            categoryTotals,
            largestExpenses
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching analytics' });
    }
};
