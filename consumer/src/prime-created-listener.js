import { Listener } from "../common/index.js";
import { PrimeCreatedEvent } from "../common/index.js";

class PrimeCreatedListener extends Listener {
  constructor(channel) {
    super(channel);
    this.exchange = PrimeCreatedEvent.exchange;
    this.queue = PrimeCreatedEvent.queue;
    this.bindingKey = PrimeCreatedEvent.bindingKey;
  }
  async onMessage(message) {
    //get prime numbers till msg
    console.log("***************Iam working****************");
    const number = Number(message?.number);
    const number_line = Array(number * 2).fill(1);
    const primes = [];
    for (let i = 2; i <= number; i++) {
      if (number_line[i] === 0) continue;
      primes.push(i);
      for (let j = i + i; j <= number; j += i) {
        number_line[j] = 0;
      }
    }
    const waitSecond = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    console.log("Primes less than or equal number: ", number);
    console.log(primes);
    await waitSecond;
    console.log("finished");
  }
}

export { PrimeCreatedListener };
