// expenseTopic.js
module.exports = {
    topic: 'expense_topic',   // Name of the Kafka topic
    partitions: 1,            // Number of partitions for the topic
    replicationFactor: 1      // Replication factor (can be increased for fault tolerance)
};
