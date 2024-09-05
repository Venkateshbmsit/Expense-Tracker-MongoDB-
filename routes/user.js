const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const expenseController = require('../controllers/expenseController');
const auth = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);

// Expense routes
router.post('/expenses', auth, expenseController.addExpense);
router.put('/expenses/:id', auth, expenseController.editExpense);
router.delete('/expenses/:id', auth, expenseController.deleteExpense);
router.get('/expenses', auth, expenseController.getExpenses);

module.exports = router;
