// expenseController.js

const expenseService = require('../services/expenseService');

// Controller for creating a new expense
exports.createExpense = async (req, res) => {
  const { userId, description, amount, splitMethod } = req.body;

  try {
    const newExpense = await expenseService.createExpense(userId, description, amount, splitMethod);
    return res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error creating expense:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller for fetching an expense by ID
exports.getExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await expenseService.getExpenseById(id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    return res.status(200).json(expense);
  } catch (error) {
    console.error('Error fetching expense:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller for fetching all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseService.getAllExpenses();
    return res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
