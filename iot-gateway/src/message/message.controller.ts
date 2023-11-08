import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDTO } from './dto/create-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() body: CreateMessageDTO) {
    return this.messageService.create(body);
  }
}
