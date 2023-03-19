class Publisher {
  constructor(channel) {
    this.channel = channel;
  }

  async publish(msg) {
    try {
      console.log(
        `Publishing message on exchange: ${this.exchange} routingKey: ${this.routingKey}`
      );
      console.log(`Message body: ${JSON.stringify(msg)}`);
      await this.channel.assertExchange(this.exchange, "topic", {
        durable: true,
      });
      await this.channel.publish(
        this.exchange,
        this.routingKey,
        Buffer.from(JSON.stringify(msg))
      );
      console.log("Success in publishing message!");
    } catch (e) {
      console.error("Error in publishing message!", e);
    }
  }
}

export { Publisher };
