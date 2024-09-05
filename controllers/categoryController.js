const Category = require('../models/Category');

// new category
exports.addCategory = async (req, res) => {
    try {
        const { name, icon } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Category name is required' });
        }

        const category = new Category({ 
            name, 
            icon, 
            user: req.user.id 
        });
        
        await category.save();
        res.status(201).json({ 
            message: 'Category added successfully', 
            categoryId: category._id 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error adding category' });
    }
};

// edit  Category
exports.editCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id, 
            { ...req.body, user: req.user.id },
            { new: true }
        );
        
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.json({ 
            message: 'Category updated successfully', 
            category 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error editing category' });
    }
};

// delete Category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category' });
    }
};

// retirve
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.id });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching categories' });
    }
};
