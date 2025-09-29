const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const balanceSheetSchema = require('./graphql/balanceSheetSchema');
const balanceSheetResolver = require('./graphql/balanceSheetResolver');

// CORRECTED FIX: Destructure sequelize and the rest of the config from the single config.js file
const { sequelize, ...config } = require('./config/config');

const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Initialize Apollo Server for GraphQL
const server = new ApolloServer({
    typeDefs: balanceSheetSchema,
    resolvers: balanceSheetResolver
});

// Important: Apply middleware must be before app.listen
server.applyMiddleware({ app, path: '/graphql' });

// Database connection
sequelize.authenticate().then(() => {
    console.log('Database connected successfully.');

    // Optional: Sync models with the database (use with caution in production)
    // require('./models/balanceSheetModel').sync(); 

    // Start the Express server only after the database connection is verified
    app.listen(config.port, () => {
        console.log(`Balance sheet service running on port ${config.port}`);
        console.log(`GraphQL endpoint available at http://localhost:${config.port}/graphql`);
    });
}).catch((err) => {
    console.error('Database connection failed. Please check credentials and service:', err.message);
    // Optionally exit the process if DB connection is critical
    // process.exit(1); 
});
