// balanceSheetResolver.js
const balanceSheetService = require('../services/balanceSheetService');

module.exports = {
  Query: {
    getBalanceSheet: async (_, { userId }) => {
      return await balanceSheetService.getBalanceSheetByUserId(userId);
    }
  },
  Mutation: {
    generateBalanceSheet: async (_, { userId }) => {
      return await balanceSheetService.generateBalanceSheet(userId);
    }
  }
};
