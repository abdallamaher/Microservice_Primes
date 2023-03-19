import { PrimeCreatedListener } from "./prime-created-listener.js";
import { rabbitMQWrapper } from "../common/index.js";

(async () => {
  await rabbitMQWrapper.connect();

  new PrimeCreatedListener(rabbitMQWrapper.channel).listen();
})();
