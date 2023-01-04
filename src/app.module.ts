import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MessageModule } from './messages/message.module';
import { MessagesService } from './messages/messages.service';

@Module({
  imports: [PrismaModule, MessageModule],
  controllers: [AppController],
  providers: [AppService, MessagesService],
})
export class AppModule {}
