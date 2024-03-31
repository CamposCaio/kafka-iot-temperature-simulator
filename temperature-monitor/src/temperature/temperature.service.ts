import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from 'src/kafka/consumer.service';
import { convertFahrenheitToCelsius } from './utils/convert-fahrenheit-to-celsius';
import { fibonacci } from './utils/fibonacci';

interface TemperatureMessage {
  temperature: number;
  unit: 'C' | 'F';
}

@Injectable()
export class TemperatureService implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  onModuleInit() {
    this.consumerService.consume({
      topics: ['temperature'],
      config: { groupId: 'temperature-monitor' },
      onMessage: async (message) => {
        const value: TemperatureMessage = JSON.parse(
          message.value?.toString() ?? '',
        );

        const temperature =
          value.unit === 'C'
            ? value.temperature
            : convertFahrenheitToCelsius(value.temperature);

        if (temperature > 50) {
          console.log('Temperature is too high!');
        }

        const now = new Date().getTime();
        const result = fibonacci(35); // Adjust the term as needed
        console.log(`Fibonacci duration ${new Date().getTime() - now}.`);
        console.log(result);
      },
    });
  }
}
