// expenseConsumer.js
const kafka = require('kafka-node');
const { topic } = require('../topics/expenseTopic');

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const consumer = new kafka.Consumer(
    client,
    [{ topic: topic, partition: 0 }], // Listens to the expense_topic
    {
        autoCommit: true               // Automatically commit the message once consumed
    }
);

consumer.on('message', (message) => {
    try {
        const expenseData = JSON.parse(message.value);
        console.log('Received expense event:', expenseData);
        
        // Process the expense event here (e.g., update balance sheet, notify users, etc.)
        
    } catch (error) {
        console.error('Error processing message from Kafka:', error);
    }
});

consumer.on('error', (error) => {
    console.error('Error in Kafka Consumer: ', error);
});
