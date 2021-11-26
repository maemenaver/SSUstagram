import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [AuthModule, UserModule, BoardModule, MessageModule]
})
export class ApiModule {}
