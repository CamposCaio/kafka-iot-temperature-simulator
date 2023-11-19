import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity]), KafkaModule],
  providers: [MessageService, MessageRepository],
})
export class MessageModule {}
