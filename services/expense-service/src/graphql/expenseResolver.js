// expenseResolver.js
const expenseService = require('../services/expenseService');

module.exports = {
  Query: {
    getExpense: async (_, { id }) => {
      return await expenseService.getExpenseById(id);
    },
    getAllExpenses: async () => {
      return await expenseService.getAllExpenses();
    }
  },
  Mutation: {
    createExpense: async (_, { userId, description, amount, splitMethod }) => {
      return await expenseService.createExpense(userId, description, amount, splitMethod);
    }
  }
};
