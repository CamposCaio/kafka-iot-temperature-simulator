import { DataSource, Repository } from 'typeorm';
import { MessageEntity } from './message.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageRepository extends Repository<MessageEntity> {
  constructor(private dataSource: DataSource) {
    super(MessageEntity, dataSource.createEntityManager());
  }
}
