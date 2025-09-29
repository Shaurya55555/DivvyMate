// src/config/config.js
const Sequelize = require('sequelize'); // FIX: Correctly import the package constructor

// 1. Define Configuration Variables
const config = {
    port: process.env.PORT || 3003,
    dbURI: process.env.DB_URI || 'postgres://divvymate:password@postgres:5432/divvymate_db',
    redisHost: process.env.REDIS_HOST || 'redis',
    kafkaBroker: process.env.KAFKA_BROKER || 'kafka:9092'
};

// 2. Initialize Sequelize
// NOTE: This assumes you have the necessary postgres driver (like pg) installed
const sequelize = new Sequelize(config.dbURI, {
    dialect: 'postgres', 
    logging: false, 
    define: {
        freezeTableName: true // Prevents Sequelize from pluralizing model names
    },
    // Specify the database connection details explicitly if URI parsing is difficult
    // host: 'postgres',
    // port: 5432,
    // username: 'divvymate',
    // password: 'password',
    // database: 'divvymate_db',
});

// 3. Export all configuration variables AND the initialized Sequelize instance
module.exports = {
    ...config, // Spread the configuration variables (port, dbURI, etc.)
    sequelize  // Add the initialized Sequelize instance
};
