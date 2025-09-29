// expenseProducer.js
const kafka = require('kafka-node');
const { topic } = require('../topics/expenseTopic');

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const producer = new kafka.Producer(client);

producer.on('ready', () => {
    console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (error) => {
    console.error('Error in Kafka Producer: ', error);
});

const sendExpenseEvent = (expenseData) => {
    const payloads = [
        {
            topic: topic,
            messages: JSON.stringify(expenseData),  // Convert expense data to JSON string for Kafka
            partition: 0
        }
    ];

    producer.send(payloads, (err, data) => {
        if (err) {
            console.error('Error sending event to Kafka: ', err);
        } else {
            console.log('Expense event sent successfully:', data);
        }
    });
};

module.exports = { sendExpenseEvent };
