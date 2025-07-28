import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { NatsModule } from '../../transports/nats.module';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';

@Module({
  imports: [NatsModule],
  controllers: [AuthController, UserController],
})
export class AuthModule {}
