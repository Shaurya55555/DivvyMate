// expenseService.js
const Expense = require('../models/expenseModel');

// Create a new expense
exports.createExpense = async (userId, description, amount, splitMethod) => {
  try {
    const newExpense = await Expense.create({ userId, description, amount, splitMethod });
    return newExpense;
  } catch (error) {
    console.error('Error creating expense:', error);
    throw new Error('Database Error');
  }
};

// Get an expense by ID
exports.getExpenseById = async (id) => {
  try {
    const expense = await Expense.findByPk(id);
    return expense;
  } catch (error) {
    console.error('Error fetching expense:', error);
    throw new Error('Database Error');
  }
};

// Get all expenses
exports.getAllExpenses = async () => {
  try {
    const expenses = await Expense.findAll();
    return expenses;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw new Error('Database Error');
  }
};
