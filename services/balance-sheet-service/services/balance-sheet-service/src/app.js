// app.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const balanceSheetSchema = require('./graphql/balanceSheetSchema');
const balanceSheetResolver = require('./graphql/balanceSheetResolver');
const sequelize = require('./config/database');  // Database setup here
const config = require('./config/config');

const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Initialize Apollo Server for GraphQL
const server = new ApolloServer({
  typeDefs: balanceSheetSchema,
  resolvers: balanceSheetResolver
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
  console.log(`Balance sheet service running on port ${config.port}`);
});
