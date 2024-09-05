const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const auth = require('../middleware/auth');

router.get('/analytics', auth, analyticsController.getAnalytics);

module.exports = router;
