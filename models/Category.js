const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    icon: String,
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
