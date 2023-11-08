import {
  Inject,
  Injectable,
  Logger,
  OnApplicationShutdown,
} from '@nestjs/common';
import { KAFKA_CONFIG } from './kafka.config';
import {
  Kafka,
  Consumer,
  ConsumerConfig,
  KafkaMessage,
  ConsumerSubscribeTopics,
} from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private logger = new Logger(ConsumerService.name);
  private readonly consumers: Consumer[];

  constructor(@Inject(KAFKA_CONFIG) private readonly kafka: Kafka) {}

  consume(params: {
    topics: ConsumerSubscribeTopics['topics'];
    config: ConsumerConfig;
    onMessage: (message: KafkaMessage) => Promise<void>;
  }) {
    const consumer = this.kafka.consumer(params.config);
    consumer.subscribe({ topics: params.topics });
    consumer.run({
      eachMessage: async ({ topic, message }) => {
        this.logger.verbose(
          `Received message from topic ${topic}: ${message.value?.toString()}`,
        );
        await params.onMessage(message);
      },
    });
  }

  onApplicationShutdown() {
    this.consumers.forEach((consumer) => consumer.disconnect());
  }
}
