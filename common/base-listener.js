class Listener {
  constructor(channel) {
    this.channel = channel;
  }

  async listen() {
    await this.channel.assertExchange(this.exchange, "topic", {
      durable: true,
    });
    await this.channel.assertQueue(this.queue, { durable: true });
    await this.channel.bindQueue(this.queue, this.exchange, this.bindingKey);
    await this.channel.consume(
      this.queue,
      async (msg) => {
        const parsedData = this.parseMessage(msg);
        await this.onMessage(parsedData);
        await this.channel.ack(msg);
      },
      {
        noAck: false,
        // consumerTag: "math_consumer",
      }
    );
    console.log(
      `[*] Waiting for messages on exchange: ${this.exchange} bindingKey: ${this.bindingKey}. To exit press CTRL+C`
    );
  }

  parseMessage(msg) {
    const data = msg.content;
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}

export { Listener };
