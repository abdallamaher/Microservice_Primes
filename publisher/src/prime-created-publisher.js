import { Publisher } from "../common/index.js";
import { PrimeCreatedEvent } from "../common/index.js";

class PrimeCreatedPublisher extends Publisher {
  constructor(channel) {
    super(channel);
    this.exchange = PrimeCreatedEvent.exchange;
    this.queue = PrimeCreatedEvent.queue;
    this.routingKey = PrimeCreatedEvent.routingKey;
  }
}

export { PrimeCreatedPublisher };
