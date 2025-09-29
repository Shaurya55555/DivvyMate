const Sequelize = require('sequelize'); // FIX: Import the entire package as 'Sequelize'
const config = require('./config'); // Import the configuration variables

// Initialize Sequelize using the dbURI from the config file
// This assumes 'dbURI' is a complete connection string (e.g., for PostgreSQL)
const sequelize = new Sequelize(config.dbURI, {
    // Specify the database dialect
    dialect: 'postgres',
    logging: false, // Set to true to see SQL queries in the console
    define: {
        freezeTableName: true // Prevents Sequelize from pluralizing model names
    },
});

// Export the initialized instance for use in app.js and model files.
module.exports = sequelize;
