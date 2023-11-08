import { Module } from '@nestjs/common';
import { KAFKA_CONFIG, kafkaConfig } from './kafka.config';
import { Kafka } from 'kafkajs';
import { ConsumerService } from './consumer.service';
import { TemperatureConsumer } from './temperature-consumer.service';

@Module({
  providers: [
    {
      provide: KAFKA_CONFIG,
      useFactory: () => new Kafka(kafkaConfig),
    },
    ConsumerService,
    TemperatureConsumer,
  ],
  exports: [ConsumerService],
})
export class KafkaModule {}
