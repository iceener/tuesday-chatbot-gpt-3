import { Module } from '@nestjs/common';
import { OpenaiService } from './openai/openai.service';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PineconeService } from './pinecone/pinecone.service';

@Module({
  providers: [OpenaiService, MessagesService, PineconeService],
  controllers: [MessagesController],
})
export class MessageModule {}
