import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import {
  IRespondeTokenValidate,
  NATS_SERVICE,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    // Validar token en auth-ms y obtener datos del usuario
    try {
      const user: IRespondeTokenValidate =
        await sendAndHandleRpcExceptionPromise(
          this.clientProxy,
          'auth.validateToken',
          { token },
        );

      request['user'] = {};
      request['rol'] = user.role;
      request['permission'] = user.permissions;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : '';
  }
}
