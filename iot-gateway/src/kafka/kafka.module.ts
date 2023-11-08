import { Module } from '@nestjs/common';
import { KAFKA_CONFIG, kafkaConfig } from './kafka.config';
import { Kafka } from 'kafkajs';
import { ProducerService } from './producer.service';

@Module({
  providers: [
    {
      provide: KAFKA_CONFIG,
      useFactory: () => new Kafka(kafkaConfig),
    },
    ProducerService,
  ],
  exports: [ProducerService],
})
export class KafkaModule {}
