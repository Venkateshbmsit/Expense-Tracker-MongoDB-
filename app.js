require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const categoryRoutes = require('./routes/category');
const budgetRoutes = require('./routes/budget');
const port = process.env.PORT || 5001;
const mongoURI = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const reportRoutes = require('./routes/reports');

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api', reportRoutes);

