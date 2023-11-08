import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { KAFKA_CONFIG } from './kafka.config';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class ProducerService implements OnApplicationShutdown {
  private readonly producer: Producer;

  constructor(@Inject(KAFKA_CONFIG) private readonly kafka: Kafka) {
    this.producer = this.kafka.producer();
    this.producer.connect();
  }

  onApplicationShutdown() {
    this.producer.disconnect();
  }

  getProducer(): Producer {
    return this.producer;
  }
}
