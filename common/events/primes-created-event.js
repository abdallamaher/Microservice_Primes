const PrimeCreatedEvent = {
  exchange: "Publisher",
  queue: "Consumer.PrimeCreated",   // QueueGroup + Handler
  bindingKey: "*.PrimeCreated",
  routingKey: "anonymous.PrimeCreated",
};
export { PrimeCreatedEvent };
