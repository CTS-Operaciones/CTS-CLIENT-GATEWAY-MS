import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/common';

@Controller('rh-bond')
export class RhBondController {
  constructor(@Inject(NATS_SERVICE) private readonly clientBond: ClientProxy) {}

  @Post()
  async create() {}
}
