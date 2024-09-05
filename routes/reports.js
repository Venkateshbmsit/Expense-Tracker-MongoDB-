const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');
const auth = require('../middleware/auth');

router.get('/report', auth, reportsController.generateReport);

module.exports = router;
