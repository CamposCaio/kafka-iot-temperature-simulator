import { KafkaConfig } from 'kafkajs';

export const KAFKA_CONFIG = Symbol('KAFKA_CONFIG');

export const kafkaConfig: KafkaConfig = {
  brokers: ['localhost:9092'],
};
