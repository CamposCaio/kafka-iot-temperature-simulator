import { Injectable, OnModuleInit } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { ConsumerService } from 'src/kafka/consumer.service';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageService implements OnModuleInit {
  constructor(
    private readonly repository: MessageRepository,
    private readonly consumerService: ConsumerService,
  ) {}

  onModuleInit() {
    this.consumerService.consume({
      topics: ['temperature'],
      config: { groupId: 'database-writer' },
      onMessage: async (messageBuffer) => {
        const createMessage = new MessageEntity();

        createMessage.message = JSON.parse(
          messageBuffer.value?.toString() ?? '',
        );

        await this.repository.save(createMessage);

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 100),
        );
      },
    });
  }
}
