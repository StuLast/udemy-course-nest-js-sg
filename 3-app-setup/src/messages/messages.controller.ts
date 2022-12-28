import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import CreateMessageDto from './Dtos/create-message.dto';
import { MessagesService } from './messages.service';

/**
 *
 */
@Controller('/messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  /**
   *
   * @returns full list of all messages
   */
  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  /**
   * Adds a message
   * @returns
   */
  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }

  /**
   *
   * @returns a message with a specific ID
   */
  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }
}
