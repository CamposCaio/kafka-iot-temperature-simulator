import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

interface TemperatureMessage {
  temperature: number;
  unit: 'C' | 'F';
}

@Injectable()
export class TemperatureConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  onModuleInit() {
    this.consumerService.consume({
      topics: ['temperature'],
      config: { groupId: 'temperature-monitor' },
      onMessage: async (message) => {
        const value: TemperatureMessage = JSON.parse(
          message.value?.toString() ?? '',
        );

        if (!value) return;

        if (value.temperature > 50) {
          console.log('Temperature is too high!');
        }
      },
    });
  }
}
