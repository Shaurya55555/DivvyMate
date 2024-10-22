// balanceSheetModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Assuming database setup is here

const BalanceSheet = sequelize.define('BalanceSheet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'balance_sheets',
  timestamps: false
});

module.exports = BalanceSheet;
