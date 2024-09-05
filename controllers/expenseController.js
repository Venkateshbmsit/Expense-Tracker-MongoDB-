// expenseController.js
const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
    const { amount, category, date, notes, paymentMethod } = req.body;
    try {
        const newExpense = new Expense({ 
            user: req.user.id, // Assuming user ID is extracted from the JWT by the auth middleware
            amount, 
            category, 
            date, 
            notes, 
            paymentMethod 
        });
        const expense = await newExpense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Error adding expense' });
    }
};

exports.editExpense = async (req, res) => {
    const { id } = req.params;
    const { amount, category, date, notes, paymentMethod } = req.body;
    try {
        const updatedExpense = await Expense.findOneAndUpdate(
            { _id: id, user: req.user.id },
            { amount, category, date, notes, paymentMethod },
            { new: true }
        );
        if (!updatedExpense) {
            return res.status(404).json({ error: 'Expense not found or not authorized' });
        }
        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ error: 'Error editing expense' });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedExpense = await Expense.findOneAndDelete({ _id: id, user: req.user.id });
        if (!deletedExpense) {
            return res.status(404).json({ error: 'Expense not found or not authorized' });
        }
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting expense' });
    }
};

exports.getExpenses = async (req, res) => {
    const { startDate, endDate, category } = req.query;
    const filter = { user: req.user.id };
    
    if (startDate && endDate) {
        filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (category) {
        filter.category = category;
    }
    
    try {
        const expenses = await Expense.find(filter).sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving expenses' });
    }
};
