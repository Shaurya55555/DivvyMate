// app.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const userRoutes = require('./routes/userRoutes');
const userSchema = require('./graphql/userSchema');
const userResolver = require('./graphql/userResolver');
const sequelize = require('./config/database'); // Assuming Sequelize is set up here

const config = require('./config/config');

const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// REST API routes
app.use('/api', userRoutes);

// Initialize Apollo Server for GraphQL
const server = new ApolloServer({
  typeDefs: userSchema,
  resolvers: userResolver
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
  console.log(`User service running on port ${config.port}`);
});
