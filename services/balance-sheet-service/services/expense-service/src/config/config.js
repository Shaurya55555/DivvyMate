// config.js

module.exports = {
    port: process.env.PORT || 3002,
    dbURI: process.env.DB_URI || 'postgres://divvymate:password@postgres:5432/divvymate_db',
    redisHost: process.env.REDIS_HOST || 'redis',
    kafkaBroker: process.env.KAFKA_BROKER || 'kafka:9092'
  };
  