import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import {
  Auth,
  MODULES_ENUM,
  NATS_SERVICE,
  Permissions,
  PERMISSIONS_ENUM,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { ChangePasswordDto, LoginDto } from './dto';

@ApiTags('Auth 🔐')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly clientAuth: ClientProxy) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientAuth,
      'auth.login',
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
      'auth.chagePassword',
      { id, ...changePasswordDto },
    );
  }

  @ApiBearerAuth()
  @Auth()
  @Permissions('EMPLEADOS', 'VER')
  @Get('reset-password/:id')
  async resetPassword(@Param('id') id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientAuth,
      'auth.resetPassword',
      { id },
    );
  }
}
