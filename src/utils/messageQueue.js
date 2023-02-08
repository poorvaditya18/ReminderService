const amqplib = require("amqplib");
const { json } = require("body-parser");

const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require("../config/serverConfig");

const createChannel = async () => {
  try {
    // 1. setup the connection with the Queue using MESSAGE_BROKER_URL
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    //2. create channel
    const channel = connection.createChannel();

    (await channel).assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    throw error;
  }
};

//subscriber - reminder service will subscribe to queue means you have to pick the pending requests from the Msg Queue
const subscribeMessage = async (channel, service, binding_key) => {
  try {
    const applicationQueue = await channel.assertQueue("REMINDER_QUEUE");

    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

    channel.consume(applicationQueue.queue, (msg) => {
      console.log("Received Data");
      console.log(msg.content.toString());
      const payload = JSON.parse(msg.content.toString());
      service(payload);
      channel.ack(msg);
    });
  } catch (error) {
    throw error;
  }
};

//publisher -
const publishMessage = async (channel, binding_key, message) => {
  try {
    await channel.assertQueue("REMINDER_QUEUE");
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  } catch (error) {
    throw error;
  }
};

module.exports = { subscribeMessage, createChannel, publishMessage };
