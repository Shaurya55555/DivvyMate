// expenseSchema.js
const { gql } = require('apollo-server-express');

module.exports = gql`
  type Expense {
    id: ID!
    userId: Int!
    description: String!
    amount: Float!
    splitMethod: String!
    created_at: String
  }

  type Query {
    getExpense(id: ID!): Expense
    getAllExpenses: [Expense]
  }

  type Mutation {
    createExpense(userId: Int!, description: String!, amount: Float!, splitMethod: String!): Expense
  }
`;
