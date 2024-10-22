// balanceSheetSchema.js
const { gql } = require('apollo-server-express');

module.exports = gql`
  type BalanceSheet {
    id: ID!
    userId: Int!
    totalAmount: Float!
    created_at: String
  }

  type Query {
    getBalanceSheet(userId: Int!): BalanceSheet
  }

  type Mutation {
    generateBalanceSheet(userId: Int!): BalanceSheet
  }
`;
