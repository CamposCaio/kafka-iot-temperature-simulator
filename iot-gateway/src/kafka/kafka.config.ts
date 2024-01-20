import { KafkaConfig } from 'kafkajs';

export const KAFKA_CONFIG = Symbol('KAFKA_CONFIG');

export const kafkaConfig: KafkaConfig = {
  clientId: 'iot-gateway',
  brokers: ['kafka1:29092'],
  ssl: false,
  connectionTimeout: 20000,
  retry: {
    retries: 8,
  },
};
