import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from '../../common';
import { ChangePasswordDto, LoginDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly clientAuth: ClientProxy) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientAuth,
      'loginAuth',
      loginDto,
    );
  }

  @Post('change-password/:id')
  async changePassword(
    @Param('id') id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientAuth,
      'chagePasswordAuth',
      { id, ...changePasswordDto },
    );
  }
}
