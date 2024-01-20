import { KafkaConfig } from 'kafkajs';

export const KAFKA_CONFIG = Symbol('KAFKA_CONFIG');

export const kafkaConfig: KafkaConfig = {
  brokers: ['kafka1:29092'],
};
