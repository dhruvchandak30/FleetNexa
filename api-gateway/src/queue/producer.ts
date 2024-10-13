import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "API-GATEWAY",
    brokers: ["localhost:9092"],
});

const producer = kafka.producer();

export async function main() {
    try {
        await producer.connect(); 
        await producer.send({
            topic: 'quickstart-events',
            messages: [
                {
                    value: 'hi there from api gateway',
                },
            ],
        });
        console.log('Message sent successfully');
    } catch (error) {
        console.error('Error in producer: ', error);
    } finally {
        await producer.disconnect();
    }
}
