// expenseRoutes.js
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Create a new expense
router.post('/expenses', expenseController.createExpense);

// Get an expense by ID
router.get('/expenses/:id', expenseController.getExpense);

// Get all expenses
router.get('/expenses', expenseController.getAllExpenses);

module.exports = router;
