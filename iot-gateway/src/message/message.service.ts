import { Injectable, Logger } from '@nestjs/common';
import { CreateMessageDTO } from './dto/create-message.dto';
import { ProducerService } from 'src/kafka/producer.service';

@Injectable()
export class MessageService {
  private logger = new Logger(MessageService.name);

  constructor(private readonly producerService: ProducerService) {}

  create(message: CreateMessageDTO) {
    this.logger.verbose(
      `Sending message to topic ${message.topic}: ${JSON.stringify(
        message.message,
      )}`,
    );

    const producer = this.producerService.getProducer();
    producer.send({
      topic: message.topic,
      messages: [{ value: JSON.stringify(message.message) }],
    });
  }
}
