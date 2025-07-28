import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from '../common';

@Controller({ path: 'notification', version: '1' })
export class NotificationController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientNotification: ClientProxy,
  ) {}
}
