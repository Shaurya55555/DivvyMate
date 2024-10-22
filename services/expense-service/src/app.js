// app.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const expenseRoutes = require('./routes/expenseRoutes');
const expenseSchema = require('./graphql/expenseSchema');
const expenseResolver = require('./graphql/expenseResolver');
const sequelize = require('./config/database');  // Database setup here
const config = require('./config/config');

const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// REST API routes for expenses
app.use('/api', expenseRoutes);

// Initialize Apollo Server for GraphQL
const server = new ApolloServer({
  typeDefs: expenseSchema,
  resolvers: expenseResolver
});

server.applyMiddleware({ app, path: '/graphql' });

// Database connection
sequelize.authenticate().then(() => {
  console.log('Database connected...');
}).catch((err) => {
  console.error('Database connection failed:', err);
});

// Start the Express server
app.listen(config.port, () => {
  console.log(`Expense service running on port ${config.port}`);
});
