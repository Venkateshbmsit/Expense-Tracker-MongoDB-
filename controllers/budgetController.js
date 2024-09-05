const Budget = require('../models/Budget');
const Expense = require('../models/Expense');

// budget set
exports.setBudget = async (req, res) => {
    try {
        const { category, amount, timePeriod } = req.body;

        if (!amount || !timePeriod || !timePeriod.startDate || !timePeriod.endDate) {
            return res.status(400).json({ error: 'Amount and time period with startDate and endDate are required' });
        }

        const budget = new Budget({
            user: req.user.id,
            category,
            amount,
            timePeriod
        });

        await budget.save();
        res.status(201).json({ message: 'Budget set successfully', budgetId: budget._id });
    } catch (error) {
        res.status(500).json({ error: 'Error setting budget' });
    }
};

// track budget
exports.trackBudget = async (req, res) => {
    try {
        const { category, startDate, endDate } = req.query;
        const userId = req.user.id;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start date and end date are required' });
        }

        const budgetQuery = { 
            user: userId, 
            'timePeriod.startDate': { $lte: new Date(endDate) }, 
            'timePeriod.endDate': { $gte: new Date(startDate) } 
        };

        if (category) {
            budgetQuery.category = category;
        }

        const budget = await Budget.findOne(budgetQuery);
        
        if (!budget) {
            return res.status(404).json({ error: 'Budget not found' });
        }

        const expenses = await Expense.find({
            user: userId,
            category: category || { $exists: true },
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        });

        const totalSpent = expenses.reduce((total, expense) => total + expense.amount, 0);
        const utilization = (totalSpent / budget.amount) * 100;

        res.status(200).json({
            budget: budget.amount,
            totalSpent,
            utilization,
            remaining: budget.amount - totalSpent
        });
    } catch (error) {
        res.status(500).json({ error: 'Error tracking budget' });
    }
};

// get all
exports.getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ user: req.user.id });
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching budgets' });
    }
};
