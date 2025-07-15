import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from '../../common';
import { ChangePasswordDto, LoginDto } from './dto';

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

  @Get('reset-password/:id')
  async resetPassword(@Param('id') id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientAuth,
      'resetPasswordAuth',
      { id },
    );
  }
}
