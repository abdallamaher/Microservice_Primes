import amqplib from "amqplib";
const amqpUrl = process.env.AMQP_URL || "amqp://localhost:5673";

class RabbitMQWrapper {
  get connection() {
    if (!this._connection) {
      throw new Error("Cannot access RabbitMQ connection before connecting");
    }
    return this._connection;
  }

  get channel() {
    if (!this._channel) {
      throw new Error("Cannot access RabbitMQ channel before connecting");
    }
    return this._channel;
  }

  async connect() {
    this._connection = await amqplib.connect(amqpUrl, "heartbeat=60");
    this._channel = await this._connection.createChannel();
    this._channel.prefetch(1);

    ["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) =>
      process.on(signal, async () => {
        await channel.close();
        await connection.close();
        process.exit();
      })
    );
  }
}

const rabbitMQWrapper = new RabbitMQWrapper();
export { rabbitMQWrapper };
