import { rabbitMQWrapper } from "../common/index.js";
import { PrimeCreatedPublisher } from "./prime-created-publisher.js";

(async () => {
  await rabbitMQWrapper.connect();

  const msg = {
    id: Math.floor(Math.random() * 1000),
    number: Math.floor(Math.random() * 100000),
  };

  await new PrimeCreatedPublisher(rabbitMQWrapper.channel).publish(msg);

  await rabbitMQWrapper.channel.close();
  await rabbitMQWrapper.connection.close();
  process.exit();
})();
