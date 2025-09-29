// balanceSheetController.js

const balanceSheetService = require('../services/balanceSheetService');

// Controller for generating balance sheets for a user
exports.generateBalanceSheet = async (req, res) => {
  const { userId } = req.body;

  try {
    const balanceSheet = await balanceSheetService.generateBalanceSheet(userId);
    return res.status(201).json(balanceSheet);
  } catch (error) {
    console.error('Error generating balance sheet:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller for fetching a user's balance sheet by user ID
exports.getBalanceSheet = async (req, res) => {
  const { userId } = req.params;

  try {
    const balanceSheet = await balanceSheetService.getBalanceSheetByUserId(userId);
    if (!balanceSheet) {
      return res.status(404).json({ message: 'Balance sheet not found' });
    }
    return res.status(200).json(balanceSheet);
  } catch (error) {
    console.error('Error fetching balance sheet:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
