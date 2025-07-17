import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from '../common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Notification 📨')
@Controller({ path: 'notification', version: '1' })
export class NotificationController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientNotification: ClientProxy,
  ) {}

  @Get()
  async sendMainTestinf() {
    return await sendAndHandleRpcExceptionPromise(
      this.clientNotification,
      'mail.sendMail.test',
      {},
    );
  }
}
