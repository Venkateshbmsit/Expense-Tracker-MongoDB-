const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const auth = require('../middleware/auth');

router.post('/', auth, budgetController.setBudget)
router.get('/', auth, budgetController.getBudgets);
router.get('/track', auth, budgetController.trackBudget);

module.exports = router;
