import { KafkaConfig } from 'kafkajs';

export const KAFKA_CONFIG = Symbol('KAFKA_CONFIG');

export const kafkaConfig: KafkaConfig = {
  clientId: 'temperature-monitor',
  brokers: ['broker:29092'],
  connectionTimeout: 20000,
  retry: { retries: 8 },
};
