const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');

router.post('/', auth, categoryController.addCategory);
router.put('/:id', auth, categoryController.editCategory);
router.delete('/:id', auth, categoryController.deleteCategory);
router.get('/', auth, categoryController.getCategories);

module.exports = router;
